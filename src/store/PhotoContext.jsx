import { createContext, useReducer } from "react";
import { UNSPLASH_API_KEY, UNSPLASH_API_URL } from "../apis/api";
import useFetch from "../hooks/useFetch";

// Create context
const PhotoContext = createContext();

// Intial State
const intialState = {
  photos: [],
  loading: false,
  error: null,
  pageNumber: 1,
  searchPageNumber: 1,
  searchQuery: "",
  selectedPhotoId : "",
  selectedPhoto: {}
};

// Reducer function
const photosReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PHOTOS_REQUEST":
      return { ...state, loading: true, error: null, photos: [], pageNumber: 1 };

    case "FETCH_PHOTOS_SUCCESS":
      const updatedPhotos = state.photos
        .concat(action.payload)
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );
      return {
        ...state,
        loading: false,
        photos: updatedPhotos,
        pageNumber: state.pageNumber + 1,
      };

    case "SEARCH_PHOTOS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        photos: [],
        searchQuery: action.payload.searchQuery,
        searchPageNumber: 1,
      };

    case "SEARCH_PHOTOS_SUCCESS":
      const updatedSearchPhotos = state.photos
        .concat(action.payload.data)
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );
      return {
        ...state,
        loading: false,
        photos: updatedSearchPhotos,
        searchPageNumber: state.searchPageNumber + 1,
        searchQuery: action.payload.searchQuery,
      };

    case "PHOTOS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "VIEW_SELECTED_PHOTO_MODAL":
      return {
        ...state,
        selectedPhoto: {},
        selectedPhotoId: ""
      };

    case "VIEW_SELECTED_PHOTO_REQUEST":
      return {
        ...state,
        selectedPhoto: {},
        selectedPhotoId: action.payload.selectedPhotoId
      };

    case "VIEW_SELECTED_PHOTO_SUCCESS":
      return {
        ...state,
        selectedPhotoId: action.payload.selectedPhotoId,
        selectedPhoto: action.payload.data
      };

    default:
      return state;
  }
};

// Create provide component
const PhotoContextProvider = ({ children }) => {
  const [photoState, photoDispatch] = useReducer(photosReducer, intialState);

  const apiKey = UNSPLASH_API_KEY;
  const apiUrl = UNSPLASH_API_URL;
  const { sendRequest } = useFetch();

  const fetchPhotos = async () => { 
    

    try {
      const { data, error } = await sendRequest({
        url: `${apiUrl}/photos/?page=${photoState.pageNumber}&client_id=${apiKey}`,
      });

      if (error != null) {
        photoDispatch({ type: "PHOTOS_FAILURE", payload: error });
      } else {
        photoDispatch({ type: "FETCH_PHOTOS_SUCCESS", payload: data });
      }
    } catch (error) {
      console.log(error);
      photoDispatch({ type: "PHOTOS_FAILURE", payload: error.message });
    }
  };

  const searchPhotos = async (query) => {
   
    try {
      const { data, error } = await sendRequest({
        url: `${apiUrl}/search/photos?page=${photoState.searchPageNumber}&query=${query}&client_id=${apiKey}`,
      });

      if (error != null) {
        photoDispatch({ type: "PHOTOS_FAILURE", payload: error });
      } else {
        photoDispatch({
          type: "SEARCH_PHOTOS_SUCCESS",
          payload: { data: data.results, searchQuery: query },
        });
      }
    } catch (error) {
      console.log(error);
      photoDispatch({ type: "PHOTOS_FAILURE", payload: error });
    }
  };

  const viewPhoto = async (selectedPhotoId) => { 
    try {
      photoDispatch({
        type: "VIEW_SELECTED_PHOTO_MODAL"
      });

      const { data, error } = await sendRequest({
        url: `${apiUrl}/photos/${selectedPhotoId}?client_id=${apiKey}`,
      }); 

      if (error != null) {
        photoDispatch({ type: "PHOTOS_FAILURE", payload: error });
      } else {
        photoDispatch({
          type: "VIEW_SELECTED_PHOTO_SUCCESS",
          payload: { data: data, selectedPhotoId },
        });
      }
    }
      catch (error) {
        console.log(error);
        photoDispatch({ type: "PHOTOS_FAILURE", payload: error });
      }
    };

  const cntxValue = {
    state: photoState,
    fetchPhotos,
    searchPhotos,
    viewPhoto,
    photoDispatch,
  };

  return (
    <PhotoContext.Provider value={cntxValue}>{children}</PhotoContext.Provider>
  );
};

export { PhotoContext, PhotoContextProvider };
