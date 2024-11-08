import React, { useState } from "react";

function LocationForm() {
  const [locationName, setLocationName] = useState("");
  const [locationCoordinates, setLocationCoordinates] = useState("");
  const [clues, setClues] = useState([]);
  const [newClue, setNewClue] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [locations, setLocations] = useState([]);

  const addClue = () => {
    if (newClue.trim() === "") return;
    setClues([...clues, newClue.trim()]);
    setNewClue("");
  };

  const editClue = (index) => {
    const updatedClue = prompt("Edit your clue:", clues[index]);
    if (updatedClue !== null) {
      const updatedClues = clues.map((clue, i) => (i === index ? updatedClue.trim() : clue));
      setClues(updatedClues);
    }
  };

  const deleteClue = (index) => {
    setClues(clues.filter((_, i) => i !== index));
  };

  const moveClueUp = (index) => {
    if (index === 0) return;
    const updatedClues = [...clues];
    [updatedClues[index - 1], updatedClues[index]] = [updatedClues[index], updatedClues[index - 1]];
    setClues(updatedClues);
  };

  const moveClueDown = (index) => {
    if (index === clues.length - 1) return;
    const updatedClues = [...clues];
    [updatedClues[index], updatedClues[index + 1]] = [updatedClues[index + 1], updatedClues[index]];
    setClues(updatedClues);
  };

  const openMapPopup = () => {
    setShowMap(true);
    loadGoogleMapsScript();
  };

  const loadGoogleMapsScript = () => {
    if (window.google) return;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  };

  // Initialize Google Map and add click event
  window.initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 10,
    });

    map.addListener("click", (event) => {
      const { lat, lng } = event.latLng;
      setLocationCoordinates(`${lat().toFixed(6)}, ${lng().toFixed(6)}`);
      setShowMap(false);
    });
  };

  const handleSubmit = () => {
    const formData = {
      locationName,
      locationCoordinates,
      clues,
    };

    // Add location to the list
    setLocations([...locations, formData]);

    // Clear form data
    setLocationName("");
    setLocationCoordinates("");
    setClues([]);
    setNewClue("");
  };

  return (
    <div className="container mx-auto mt-8 p-6 flex bg-gray-900 text-white min-h-screen">
      {/* Left Side - Form */}
      <div className="w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg mr-4">
        <h2 className="text-2xl font-semibold mb-4">Location Entry Form</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="locationName" className="block text-sm font-medium mt-4">
            Location Name:
          </label>
          <input
            type="text"
            id="locationName"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            required
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="locationCoordinates" className="block text-sm font-medium mt-4">
            Location Coordinates (optional):
          </label>
          <input
            type="text"
            id="locationCoordinates"
            value={locationCoordinates}
            onChange={(e) => setLocationCoordinates(e.target.value)}
            placeholder="Enter manually or select on map"
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={openMapPopup}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Select on Map
          </button>

          <label htmlFor="clueInput" className="block text-sm font-medium mt-4">
            Add Clue:
          </label>
          <input
            type="text"
            id="clueInput"
            value={newClue}
            onChange={(e) => setNewClue(e.target.value)}
            placeholder="Enter a clue"
            className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addClue}
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
          >
            Add Clue
          </button>
        </form>

        <h3 className="text-lg font-semibold mt-6">Clues List</h3>
        <ul className="mt-4 space-y-2">
          {clues.map((clue, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-gray-700 rounded-md"
            >
              <span>{clue}</span>
              <div className="flex space-x-2">
                <button onClick={() => editClue(index)} className="text-blue-400 hover:text-blue-600">
                  Edit
                </button>
                <button
                  onClick={() => deleteClue(index)}
                  className="text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
                <button onClick={() => moveClueUp(index)} className="text-gray-400">
                  ↑
                </button>
                <button onClick={() => moveClueDown(index)} className="text-gray-400">
                  ↓
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md"
          >
            Submit Form
          </button>
        </div>
      </div>

      {/* Right Side - Locations List */}
      <div className="w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg ml-4">
        <h3 className="text-2xl font-semibold mb-4">Submitted Locations</h3>
        <div className="space-y-4">
          {locations.map((location, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-md">
              <h4 className="text-lg font-medium">{location.locationName}</h4>
              <p className="text-sm text-gray-400">
                Coordinates: {location.locationCoordinates || "N/A"}
              </p>
              <h5 className="text-sm font-semibold mt-2">Clues:</h5>
              <ul className="list-disc list-inside ml-4 text-sm">
                {location.clues.map((clue, clueIndex) => (
                  <li key={clueIndex}>{clue}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="relative w-4/5 h-4/5 bg-gray-900 rounded-lg overflow-hidden">
            <div id="map" className="w-full h-full"></div>
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
            >
              Close Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationForm;
