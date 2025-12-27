import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issues in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to fit bounds
const ChangeView = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds && bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [bounds, map]);
    return null;
};

const SupplyChainMap = ({ stages }) => {
    if (!stages || stages.length === 0) return null;

    // Extract coordinates [lat, lng] (Note: Mongo stores [lng, lat])
    const positions = stages.map(stage => [
        stage.location.coordinates[1],
        stage.location.coordinates[0]
    ]);

    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-inner border border-gray-200 z-0 relative">
            <MapContainer
                center={positions[0]}
                zoom={3}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ChangeView bounds={positions} />

                {stages.map((stage, index) => (
                    <Marker
                        key={stage._id || index}
                        position={[stage.location.coordinates[1], stage.location.coordinates[0]]}
                    >
                        <Popup>
                            <div className="p-1">
                                <span className="text-xs font-bold text-nature-600 uppercase tracking-wider">
                                    Stage {index + 1}
                                </span>
                                <h4 className="font-bold text-gray-900 text-sm mt-1">{stage.stageName}</h4>
                                <p className="text-gray-500 text-xs mt-1">{stage.address}</p>
                                <p className="text-gray-600 text-xs mt-2">{stage.description}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <Polyline
                    positions={positions}
                    pathOptions={{ color: '#288757', weight: 4, dashArray: '10, 10', opacity: 0.7 }}
                />
            </MapContainer>
        </div>
    );
};

export default SupplyChainMap;
