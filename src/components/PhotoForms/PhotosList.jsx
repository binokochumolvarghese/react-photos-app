import { useContext, useEffect, useRef, useCallback } from "react";
import { PhotoContext } from "../../store/PhotoContext";

const PhotosList = () => {
  const { state, fetchPhotos, searchPhotos } = useContext(PhotoContext);
  const { photos, loading, error, searchQuery } = state;

  const observer = useRef();

  useEffect(() => {
    // Fetch photos initially
    fetchPhotos();

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []); // Added fetchPhotos to the dependency array

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
          if (searchQuery === '') {
            fetchPhotos();
          } else {
            searchPhotos(searchQuery);
          }
        }
      });

      // Observe the last photo node if it exists
      if (node) observer.current.observe(node);
    },
    [loading, searchQuery, fetchPhotos, searchPhotos] // Included necessary dependencies
  );

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Please wait, we are loading something awesome...</p>}
      {error && <p>Error: {error}</p>}

      <div className="md:columns-3 sm:columns-1 gap-4">
        {photos.map((photo, index) => {
          const isLastPhoto = photos.length === index + 1; // Ensure it's the last element
          return (
            <img
              ref={isLastPhoto ? lastPostElementRef : null} // Attach ref to the last photo
              className="w-full pb-4"
              key={photo.id} // Unique key for each photo
              src={photo.urls.small}
              alt={photo.alt_description}
            ></img>
          );
        })}
      </div>
    </div>
  );
};

export default PhotosList;
