import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../../store/PhotoContext";

const ViewSelectedPhoto = () => {
  const { state, photoDispatch } = useContext(PhotoContext);
  const { selectedPhoto } = state;

  console.log(selectedPhoto);

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        {Object.keys(selectedPhoto).length != 0 ? (
          <>
            <div className="">
              <div className="grid grid-cols-3 grid-flow-col gap-4">
                <img src={selectedPhoto.user.profile_image.small} />
                <p className="text-gray-700">{selectedPhoto.user.name}</p>
              </div>
              <div className="grid grid-cols-1">
                <img src={selectedPhoto.urls.small} />
              </div>
              <div className="grid grid-cols-3 grid-flow-col gap-4">
                <div>
                  <span className="text-gray-500">Views</span>
                  <br />
                  {selectedPhoto.views}
                </div>

                <div>
                  <span className="text-gray-500">Downloads</span>
                  <br />
                  {selectedPhoto.downloads}
                </div>

                <div>
                  <span className="text-gray-500">likes</span>
                  <br />
                  {selectedPhoto.likes}
                </div>
              </div>
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
