import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../../store/PhotoContext";

const ViewSelectedPhoto = () => {
  const { state, photoDispatch } = useContext(PhotoContext);
  const { selectedPhoto } = state;

  return (
    <>
      <div className="min-h-80 p-4">
        {Object.keys(selectedPhoto).length != 0 ? (
          <>
            <div className="items-center justify-center">
              <div className="flex  justify-start pb-2">
                <img
                  className="rounded-full"
                  src={selectedPhoto.user.profile_image.small}
                  alt={selectedPhoto.user.name}
                />
                <p className="text-gray-700 pl-2">{selectedPhoto.user.name}</p>
              </div>
              <div className="flex justify-center items-center">
                <img
                  className="rounded"
                  src={selectedPhoto.urls.small}
                  alt="Selected"
                />
              </div>

              <div className="flex justify-center grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <span className="text-gray-500">Views</span>
                  <br />
                  {selectedPhoto.views}
                </div>

                <div className="text-center">
                  <span className="text-gray-500">Downloads</span>
                  <br />
                  {selectedPhoto.downloads}
                </div>

                <div className="text-center">
                  <span className="text-gray-500">Likes</span>
                  <br />
                  {selectedPhoto.likes}
                </div>
              </div>
            </div>

            <div className="flex justify-center flex-wrap mt-4">
              {selectedPhoto.tags && selectedPhoto.tags.length > 0 ? (
                selectedPhoto.tags.map((tag) => (
                  <p
                    key={tag.title}
                    className="bg-zinc-300 rounded p-1 m-2 text-gray-500 text-sm"
                  >
                    {tag.title}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No tags available</p>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ViewSelectedPhoto;
