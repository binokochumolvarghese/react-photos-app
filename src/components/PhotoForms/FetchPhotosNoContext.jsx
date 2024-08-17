import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { UNSPLASH_API_KEY, UNSPLASH_API_URL } from "../../apis/api";
import { useRef } from "react";
import { useCallback } from "react";

const FetchPhotos = () => {
  const apiKey = UNSPLASH_API_KEY;
  const apiUrl = UNSPLASH_API_URL;
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { sendRequest } = useFetch();

  const fetchPhotos = async () => {
    setLoading(true);
    const { data, error } = await sendRequest({
      url: `${apiUrl}/photos/?page=${pageNumber}&client_id=${apiKey}`,
    });
    setPhotos((prevData) => [...prevData, ...data]);
    setLoading(false);
    setError(error);
  };


  useEffect(() => {
    fetchPhotos();
  }, [pageNumber]);

  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        console.log(entries)
        if (entries[0].isIntersecting) {
            // trigger loading of new posts by changing page number.
            setPageNumber((prevPageNumber) => prevPageNumber + 1); 
            console.log(pageNumber);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <>
      <div className="container mx-auto">
        <div className="columns-3 gap-4">
          {photos.map((photo,index) => {
            return (
              <img
                ref={photos.length === index + 1 ? lastPostElementRef : null}
                className="w-full pb-4"
                key={photo.id}
                src={photo.urls.small}
                alt=""
              ></img>
            );
          })}
        </div>

        <div className="grid grid-flow-col gap-4 place-content-center pt-4">
        </div>
      </div>
    </>
  );
};

export default FetchPhotos;
