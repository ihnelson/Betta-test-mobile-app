"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  MapPin,
  Star,
  Share2,
  Gift,
  Moon,
  Sun,
  Heart,
  User,
  Map,
} from "lucide-react";

const suggestedCravings = [
  "Tacos",
  "Ramen",
  "Pastries",
  "Sushi",
  "BBQ",
  "Pizza",
  "Falafel",
];

const localResults = suggestedCravings.map((craving) => ({
  name: `${craving} Delight`,
  image: "https://via.placeholder.com/150",
  rating: (4.5 + Math.random()).toFixed(1),
  location: `${(Math.random() * 5).toFixed(1)} mi`,
}));

export default function HyGrubApp() {
  const [location, setLocation] = useState("");
  const [craving, setCraving] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [points, setPoints] = useState(0);
  const [referralCode] = useState("HYFRIEND23");
  const [favorites, setFavorites] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminLocations, setAdminLocations] = useState([]);
  const [newName, setNewName] = useState("");
  const [newLoc, setNewLoc] = useState("");
  const [newImg, setNewImg] = useState("");
  const isAdmin = true;

  const handleSearch = () => {
    setPoints(points + 10);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleFavorite = (item) => {
    setFavorites((prev) =>
      prev.includes(item.name)
        ? prev.filter((f) => f !== item.name)
        : [...prev, item.name]
    );
  };

  return (
    <main
      className={`p-4 max-w-md mx-auto ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-2 text-center">HyGrub</h1>

      <div className="flex justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={() => setShowAdmin(!showAdmin)}>
          <User />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setShowMap(!showMap)}>
          <Map />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? <Sun /> : <Moon />}
        </Button>
      </div>

      <p className="text-center text-sm mb-6 italic">
        Find Flavor Wherever You Land
      </p>

      <Card className="mb-4">
        <CardContent className="space-y-2 p-4">
          <Input
            placeholder="Enter your city or country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            placeholder="What are you craving? (e.g. tacos, ramen, pastries)"
            value={craving}
            onChange={(e) => setCraving(e.target.value)}
            list="craving-suggestions"
          />
          <datalist id="craving-suggestions">
            {suggestedCravings.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>
          <Button className="w-full" onClick={handleSearch}>
            Search Food
          </Button>

          {adminLocations.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Submitted:</h3>
              <ul className="list-disc list-inside">
                {adminLocations.map((entry, idx) => (
                  <li key={idx}>
                    {entry.name} ({entry.location})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {craving && (
        <div className="space-y-4">
          {localResults
            .filter((item) =>
              item.name.toLowerCase().includes(craving.toLowerCase())
            )
            .map((item, index) => (
              <Card key={index} className="flex overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
                <CardContent className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-semibold text-lg">{item.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {item.location} • {item.rating}⭐
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(item)}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(item.name) ? "fill-red-500" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      <Card className="mt-4 mb-4">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">BitePoints</p>
            <p>{points} pts</p>
          </div>
          <div className="text-right">
            <Gift className="inline-block w-5 h-5 mr-1" />
            <span className="text-sm">
              Earn free months of HyGrub Plus features!
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="font-semibold mb-2">Referral Code</p>
          <Input value={referralCode} readOnly className="mb-2" />
          <Button className="w-full">Invite Friends</Button>
        </CardContent>
      </Card>

      {favorites.length > 0 && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold mb-2">Saved Favorites</h2>
            <ul className="list-disc list-inside space-y-1">
              {favorites.map((fav, i) => (
                <li key={i}>{fav}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {showMap && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold mb-2">Map View</h2>
            <iframe
              title="Map View"
              src={`https://www.google.com/maps/embed/v1/search?key=${
                process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
              }&q=${encodeURIComponent(craving + " food near " + location)}`}
              width="100%"
              height="300"
              allowFullScreen
              loading="lazy"
              className="rounded-xl border"
            ></iframe>
          </CardContent>
        </Card>
      )}

      {showAdmin && (
        <Card className="mt-4">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-bold">Admin Dashboard</h2>
            <Input
              placeholder="Add new restaurant name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Input
              placeholder="Add location"
              value={newLoc}
              onChange={(e) => setNewLoc(e.target.value)}
            />
            <Input
              placeholder="Add image URL"
              value={newImg}
              onChange={(e) => setNewImg(e.target.value)}
            />
            <Button
              onClick={() =>
                setAdminLocations([
                  ...adminLocations,
                  { name: newName, location: newLoc, image: newImg },
                ])
              }
            >
              Add Location
            </Button>
            <p className="text-sm text-muted-foreground">
              This dashboard is for internal team only. Future features will
              include review moderation and analytics export.
            </p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
Commit new file
