import '../customstyle/map.css'
import React, { Fragment } from 'react';
import {useState} from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useEffect } from 'react';

const mapStyles = {
    width: '100%',
    height: '100%',
  };

const GoogleMap = (props) => {

    const {name} = props;

    const [latLng, setLatLng] = useState({
        lat: 24.666,
        lng: 88.564
    });
    const [openInformationModal, setOpenInformationModal] = useState(false);

    const onMarkerModalClick = () => {
        setOpenInformationModal(!openInformationModal);
    }

  useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatLng({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
      })
      
  }, []);

  const onSubmitButton = (e) => {
      e.preventDefault();
      var lat = e.target.userLat.value;
      var lng = e.target.userLng.value;
      var name = e.target.userName.value;
      console.log(lat);
      console.log(lng);
      console.log(name);
      setOpenInformationModal(!openInformationModal);
  }

        return(
            <Fragment>
                <Map
                    google={props.google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{ lat: latLng.lat, lng: latLng.lng}}
                    >
                    <Marker 
                    position={{ lat: latLng.lat, lng: latLng.lng}}
                    onClick={onMarkerModalClick}
                    />
                </Map>
                <Modal isOpen={openInformationModal} toggle={onMarkerModalClick} className="modal-md">
                    <ModalHeader toggle={onMarkerModalClick}>User Informations</ModalHeader>
                    <ModalBody>
                        <form onSubmit={(e) => onSubmitButton(e)} className="form-group">
                            <label for="userLat">UserLat</label>
                            <input id="userLat" className="form-control" type="text" name="userLat" value={latLng.lat}  />
                            <label for="userLng">UserLng</label>
                            <input id="userLng" className="form-control" type="text" name="userLng" value={latLng.lng} />
                            <label for="userName">UserName</label>
                            <input id="userName" className="form-control" type="text" name="userName" value={name} />
                            <br />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </ModalBody>
                </Modal>
         </Fragment>
          
        )
}

export default React.memo(GoogleApiWrapper({
    apiKey: 'AIzaSyCK8OyOBl3euDxVpECYKBm__OLb9OWu3QY'
  })(GoogleMap));
