import mapboxgl from 'mapbox-gl'
import MapGL,{ Marker, NavigationControl, Source, Layer } from 'react-map-gl'
import { Loader } from '@components/ui/common'
import { ToggleButtons, SVG } from '@components/ui/main'
import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {clusterLayer, clusterCountLayer, unclusteredPointLayer} from "@utils/layers"
import { CustomPopup } from '@components/ui/main'



export default function MapHome({initialView}) {
  const { projects, isLoading } = useSelector((state) => state.projectData)
  const dispatch = useDispatch()

  const [mapView, setMapView] = useState('pins')
  const [popupInfo, setPopupInfo] = useState(null)

  
  mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGhld2Jlcm5oYXJkdCIsImEiOiJjbDYzejZpaGYwaGg1M2tsdmViOW05Zmw1In0.ILKwMbc0ahbTlF9HvQeGyQ'
  
  // mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_TOKEN

  // Clusters or Pins
const handleMapView = (value) => {
  setMapView(value)
}

// Set the Data for the Cluster
let clusterGeoData = {};
  clusterGeoData.type = "FeatureCollection";
  clusterGeoData.features = [];

  if(projects) {
    clusterGeoData.features = projects.map((project) => ({
      type: 'Feature',
      properties: {
        name: project.street_address
      },
      geometry: {
        type: 'Point',
        coordinates: [project.longitude, project.latitude]
      }
    }))
  }

  const pins = useMemo(
    () => 
    projects.map((project) => (
      <Marker
        latitude={project.latitude} 
        longitude={project.longitude} 
        anchor='bottom'
        key={project._id}
        onMouseEnter={(e) => {
          e.originalEvent.stopPropagation();
          setPopupInfo(project)}}
        onMouseLeave={() => setPopupInfo(null)}
        onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(project);
        }}
      >
        <SVG />
      </Marker>
    ))
    )

  if(isLoading) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center p-5">
        <Loader />
      </div>
    )
  }

  
  return (
    <>
      <main className="flex flex-1 flex-col justify-center items-center p-5">
      <MapGL
          initialViewState={{
            latitude: initialView.latitude,
            longitude: initialView.longitude,
            zoom: initialView.zoom
          }}
          doubleClickZoom={true}
          style={{width: 750, height: 500}}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          {mapView === 'pins' &&  pins}
          {popupInfo && (
            <CustomPopup 
              popupInfo={popupInfo}
              onClose={() => setPopupInfo(null)}
              onClick={() => onClick(popupInfo)} 
            /> 
          )}
          {mapView === 'clusters' &&
            <Source
              id="earthquakes"
              type="geojson"
              data={clusterGeoData}
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
            >
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
          }
          <div className='flex flex-end'>
            <div className='flex flex-col'>
              <NavigationControl />
              <ToggleButtons mapView={handleMapView}/>  
            </div>
          </div>
        </ MapGL>
      </main>
    </> 
  )
}