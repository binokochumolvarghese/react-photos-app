import { useContext, useEffect, useRef, useCallback } from "react";
import { PhotoContext } from "../../store/PhotoContext";
import Modal from "../UI/Modal";
import ViewSelectedPhoto from "./ViewSelectedPhoto";

const PhotosList = () => {
  const { state, fetchPhotos, searchPhotos, viewPhoto, photoDispatch } =
    useContext(PhotoContext);
  const { photos, loading, error, searchQuery } = state;

  const observer = useRef();
  const modal = useRef();

  useEffect(() => {
    // Fetch photos initially
    photoDispatch({ type: "FETCH_PHOTOS_REQUEST" });
    fetchPhotos();

    // Add eventlistener for Esacpe key
    if (modal.current.open()) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;

      // Disconnect the previous observer if it exists
      if (observer.current) observer.current.disconnect();

      // Create a new IntersectionObserver instance
      observer.current = new IntersectionObserver((entries) => {
        // Check if the last photo is intersecting with the viewport
        if (entries[0].isIntersecting && !loading) {
          // Fetch more photos
          if (searchQuery === "") {
            fetchPhotos();
          } else {
            searchPhotos(searchQuery);
          }
        }
      });

      // Observe the last photo node if it exists
      if (node) observer.current.observe(node);
    },
    [loading, searchQuery, fetchPhotos, searchPhotos]
  );

  const onViewHandler = (selectedPhotoId) => {
    viewPhoto(selectedPhotoId);
    modal.current.open();
  };

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      modal.current.close();
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Please wait, we are loading something awesome...</p>}

      <div className="md:columns-3 sm:columns-1 gap-4">
        {photos.map((photo, index) => {
          const isLastPhoto = photos.length === index + 1; // Ensure it's the last element
          return (
            <img
              ref={isLastPhoto ? lastPostElementRef : null} // Attach ref to the last photo
              className="w-full pb-4"
              key={photo.id}
              src={photo.urls.small}
              alt={photo.alt_description}
              onClick={ () => { onViewHandler(photo.id) } }
            ></img>
          );
        })}
      </div>

      {error && (
        <div className="grid gap-4 p-4">
          <div className="mx-auto">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        </div>
      )}

      {
        <Modal ref={modal} headerTitle={""} btnCaption={"Close"}>
          <ViewSelectedPhoto
            closeModal={modal}
          />
        </Modal>
      }
    </div>
  );
};

export default PhotosList;
