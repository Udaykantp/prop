import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import properties from "../data/properties";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaBed,
  FaIdCard,
  FaRulerCombined,

  // Building / Office
  FaBuilding,
  FaBriefcase,
  FaHome,
   FaGlobe,
  FaTshirt,
  FaUtensils,
  FaCoffee,
  FaCrown,
  FaStore,
  FaTags,
  FaShoppingBag,
  FaGem,
  FaArrowsAltV,
  FaChair,
  FaSignInAlt,

  // Business / Services
  FaPlug,
  FaHandshake,
  FaMoneyBillWave,
  FaFileSignature,
  FaBalanceScale,
  FaClock,
  FaTruck,
  FaShoppingCart,

  // Common
  FaUsers,
  FaCar,
  FaDumbbell,
  FaTree,
  FaLeaf,
  FaArrowUp,
  FaBolt,
  FaShieldAlt,

  // Furniture
  FaCouch,
  FaDoorClosed,

  // Home Appliances
  FaLightbulb,
  FaSnowflake,
  FaHotTub,
  FaHandHoldingWater,

  // Resort / Hospitality
  FaUmbrellaBeach,
  FaChalkboardTeacher,

  // Sports
  FaTableTennis,

  // Wellness
  FaSpa,
  FaUser,

  // Entertainment
  FaGamepad,
  FaGolfBall,
  FaFilm,
  FaMusic,
  FaTv,

  // Kids
  FaChild,

  // Outdoor Activities
  FaRunning,
  FaBicycle,
  FaTheaterMasks,
  FaPaw,
  FaWalking,

  // EV / Infrastructure
  FaChargingStation,

  // Roads
  FaRoad,
} from "react-icons/fa";

import {
  TbSolarElectricity,
  TbMichelinStarGreen,
} from "react-icons/tb";

import {
  GiShop,
  GiSofa,
} from "react-icons/gi";

import {
  PiSecurityCameraFill,
  PiFanFill,
} from "react-icons/pi";

import {
  RiFridgeFill,
} from "react-icons/ri";

import {
  MdTv,
  MdPool,
  MdSportsCricket,
} from "react-icons/md";
import { FaStairs, FaElevator } from "react-icons/fa6";
import Breadcrumb from "../components/Breadcrumb";

const PropertyDetails = () => {
  const { category, slug } = useParams();

  const property = properties.find(
    (item) => item.category === category && item.slug === slug
  );

  const [openFAQ, setOpenFAQ] = useState(null);
  const [mainImage, setMainImage] = useState(
    property?.images?.[0] || property?.thumbnail || property?.image || ""
  );

  if (!property) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Property Not Found
        </h1>
      </div>
    );
  }

  const relatedProperties = properties
    .filter(
      (item) => item.category === property.category && item.id !== property.id
    )
    .slice(0, 3);

const amenityIcons = {

  // 🚗 Parking
  Parking: <FaCar />,
  "One Covered Car Parking": <FaCar />,

  // 🏋️ Gym
  Gym: <FaDumbbell />,
  Gymnasium: <FaDumbbell />,
  "Open Gym": <FaDumbbell />,
  "Weight Training Area": <FaDumbbell />,

  // 🏊 Swimming Pools
  "Swimming Pool": <MdPool />,
  "All Weather Pool": <MdPool />,
  "Infinity Edge Swimming Pool": <MdPool />,
  "Kids Pool": <MdPool />,
  "Indoor Heated Pool": <MdPool />,
  "Private Pool": <MdPool />,

  // 🌳 Green / Garden
  Garden: <FaTree />,
  Park: <FaTree />,
  "Children Park": <FaTree />,
  "Industrial Park": <FaTree />,
  "Landscaped Green Spaces": <FaTree />,
  "Landscaped Garden": <FaTree />,
  "Regal Landscaped Spaces": <FaTree />,
  "Lush Green Views": <FaLeaf />,
  "Sustainable Living": <FaLeaf />,

  // 🏢 Building / Infrastructure
  "Built to Suit Towers": <FaBuilding />,
  "Ready to Move Infrastructure": <FaBuilding />,
  "Neoclassical Architecture": <FaBuilding />,
  "Double-Height Entrance Lobby": <FaBuilding />,
  "Luxury Clubhouse": <FaBuilding />,
  Clubhouse: <FaUsers />,

  // 💼 Office / Workspace
  "Dynamic Workspaces": <FaUsers />,
  "Adaptable Offices": <FaBriefcase />,
  "Ready to Move Workspaces": <FaBriefcase />,
  "Business Center": <FaBriefcase />,

  // 🔌 Power
  "Power Backup": <FaBolt />,
  "3 KVA Power Back-up": <FaBolt />,
  "Uninterrupted Power Supply": <FaBolt />,
  Electricity: <TbSolarElectricity />,

  // 🛡️ Security
  Security: <FaShieldAlt />,
  "24x7 Security": <PiSecurityCameraFill />,
  "24/7 Security": <FaShieldAlt />,

  // 🤝 Business / Services
  "B2G-B2B-B2C Services": <FaHandshake />,
  "JVs & M&A": <FaHandshake />,
  "Government Approvals": <FaFileSignature />,
  "Supportive Policies": <FaBalanceScale />,
  "Tax Incentives & Benefits": <FaMoneyBillWave />,
  "Logistic Support": <FaTruck />,
  "Skilled, Semi-Skilled & Unskilled Human Resources": <FaUsers />,
  "Retail & Recreation": <FaShoppingCart />,

  // 🛋️ Furniture
  "Fully Furnished": <FaCouch />,
  "7-Seater Sofa With Center Table": <GiSofa />,
  "2 Double Beds With Side Tables": <FaBed />,
  "2 Almirahs": <FaDoorClosed />,

  // 🏠 Home Appliances
  Fridge: <RiFridgeFill />,
  "32 Inch LED": <MdTv />,
  RO: <FaHandHoldingWater />,
  "Fans All Rooms": <PiFanFill />,
  "LED Bulbs All Rooms": <FaLightbulb />,
  Geyser: <FaHotTub />,

  // ❄️ AC
  "2 Window AC": <FaSnowflake />,
  "1 Split AC": <FaSnowflake />,

  // 🌴 Resort
  "Gated Resort": <FaUmbrellaBeach />,

  // 🌴 Conference / Community
  "Conference Hall": <FaChalkboardTeacher />,
  "Community Hall": <FaUsers />,
  "Party Lawn": <FaTree />,

  // ⚡ Operations
  "24/7 Operations": <FaClock />,
  "Plug & Play Services": <FaPlug />,
  "Live Work Play": <FaHome />,

  // 🏊 Outdoor / Sports
  "Outdoor Jacuzzi": <FaHotTub />,
  "Covered Badminton Court": <FaTableTennis />,
  "Badminton Court": <FaTableTennis />,
  "Squash Court": <FaTableTennis />,
  "Tennis Court": <FaTableTennis />,
  "Pickleball Court": <FaTableTennis />,

  // 🥊 Fitness / Wellness
  "Boxing Area": <FaDumbbell />,
  Spa: <FaSpa />,
  "Massage Room": <FaSpa />,
  "Steam Room": <FaHotTub />,
  "Sauna Room": <FaHotTub />,
  "Yoga Area": <FaUser />,
  "Yoga Room": <FaUser />,
  "Cricket Practice Net": <MdSportsCricket/>,

  // 🎮 Entertainment
  "Gaming Zone": <FaGamepad />,
  "Virtual Golf Area": <FaGolfBall />,
  "Golf Simulator": <FaGolfBall />,
  MiniPlex: <FaFilm />,
  "Audio Visual Room": <FaTv />,
  "Art, Music and Karaoke Room": <FaMusic />,

  // 👶 Kids
  "Kids Play Area": <FaChild />,
  "Preteen Play Area": <FaChild />,

  // 🏃 Tracks
  "Jogging Track": <FaRunning />,
  "Cycling Track": <FaBicycle />,

  // 🌿 Outdoor Spaces
  Amphitheatre: <FaTheaterMasks />,
  "Pet Park": <FaPaw />,
  "Pet Area": <FaPaw />,
  "Vehicle-Free Zone": <FaWalking />,

  // ⚡ EV
  "Dedicated EV Charging": <FaChargingStation />,

  // 🛗 Lift
  Lift: <FaArrowUp />,
  "High-Speed Elevators": <FaBuilding />,

  // 🛒 Retail
  Restaurant: <GiShop />,

  // 🛏️ Guest
  "Guest Rooms": <FaBed />,

  // 🛣️ Roads
  "30-40 Feet Wide Roads": <FaRoad />,
  "Global Fashion": <FaGlobe />,
"Couture": <FaTshirt />,
"Fine Dining": <FaUtensils />,
"Artisanal Cafes": <FaCoffee />,
"Entertainment": <FaTheaterMasks />,
"Exclusive Clubs": <FaCrown />,
"Atrium-Led Experiential Design": <FaBuilding />,

"4500+ Car Parking Spaces": <FaCar />,
"Triple-Height Luxury Stores": <FaStore />,
"Rooftop Gourmet Restaurants": <FaUtensils />,
"Exclusive Brands": <FaTags />,
"Premium Branded Retail": <FaStore />,
"Boutique Retail": <FaStore />,
"Luxury Shopping": <FaShoppingBag />,
"Anchor Stores": <FaStore />,
"Hypermarket": <FaShoppingCart />,
"Food Court": <FaUtensils />,
"Designer Stores": <FaStore />,
"Jewellery Stores": <FaGem />,
"Electronics Stores": <FaTv />,
"Family Fashion": <FaTshirt />,
"Salon and Spa": <FaSpa />,
"Restaurants": <FaUtensils />,
"Recreation Areas": <FaGamepad />,
"Kids' Zones": <FaChild />,
"Entertainment Spaces": <FaTheaterMasks />,
"Family Entertainment": <FaUsers />,

"25 Lifts": <FaElevator />,
"66 Escalators": <FaArrowsAltV />,
"2 Travelators": <FaWalking />,
"13 Staircases": <FaStairs />,
"Air-Conditioned Lobbies": <FaSnowflake />,
"Centralized Landscaped Plaza": <FaTree />,
"Large Green Central Courts": <FaTree />,
"Terrace Seating": <FaChair />,
"Outdoor Seating": <FaChair />,
"Open Terraces": <FaBuilding />,
"LED Advertisement Screens": <FaTv />,
"6-Screen Multiplex": <FaFilm />,
"Dedicated Entry and Exit": <FaSignInAlt />,
"Dedicated Car Parking": <FaCar />,

"Triple-Height Flagship Stores": <FaStore />,
"Multi-Cuisine Restaurants": <FaUtensils />,
"Alfresco Dining": <FaUtensils />,
"Family Entertainment Zone": <FaUsers />,
};

  const whatsappNumber = "919650130106";
  const phoneNumber = "+919650130106";

  const whatsappMessage = `
Hello Propsarathi Infracon Pvt. Ltd.

I am interested in this property.

Category:${property.category}
Property: ${property.title}
Location: ${property.location || property.city}
Price: ${property.priceText || `₹${property.price} Lakh`}
Type: ${property.propertyType}
BHK: ${property.bhk || property.type || "—"}

Please share more details and availability.
`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ================= HERO ================= */}

      <section className="relative">

        <img
          src={property.thumbnail}
          alt={property.title}
          className="w-full h-[480px] object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex items-end">

          <div className="max-w-7xl mx-auto w-full px-6 pb-10 text-white">

            <Link
              to={`/${category}`}
              className="inline-flex items-center gap-2 mb-5 text-white"
            >
              <FaArrowLeft />
              Back
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl font-bold">
                {property.title}
              </h1>

              <p className="flex items-center gap-2 mt-4 text-lg">

                <FaMapMarkerAlt />

                {property.location || property.city}

              </p>
              <div className="flex gap-3 mt-5">
                <h2 className="text-4xl font-bold text-green-400 ">
                {property.priceText || `₹${property.price} Lakh`}
              </h2>
                 <p className="mt-3 text-lg">{property.type}</p>
              </div>
              

            </motion.div>

          </div>

        </div>

      </section>

      {/* ================= IMAGE GALLERY ================= */}
<Breadcrumb />
      <section className="max-w-7xl mx-auto px-6 py-14">

        <h2 className="text-3xl font-bold mb-8">

        Gallery

        </h2>

        <div className="grid lg:grid-cols-2 gap-10">

          <div>

            <img
              src={mainImage}
              className="rounded-2xl h-[450px] w-full object-cover shadow-xl"
              alt=""
            />

          </div>

          <div className="grid grid-cols-2 gap-5">

            {property.images?.slice(1,6).map((img, index) => (

              <img
                key={index}
                src={img}
                className={`rounded-xl h-52 w-full object-cover cursor-pointer transition duration-300 hover:scale-105`}
                alt="gallery-img"
              />

            ))}

          </div>

        </div>

      </section>

      {/* ================= PROPERTY INFO ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-14">

        <h2 className="text-3xl font-bold mb-8">

          Property Information

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaHome className="text-3xl text-green-600 mb-3" />

            <p className="text-gray-500">

              Property Type

            </p>

            <h3 className="text-xl font-bold">

              {property.propertyType}

            </h3>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaBed className="text-3xl text-green-600 mb-3" />

            <p className="text-gray-500">

              BHK

            </p>

            <h3 className="text-xl font-bold">

              {property.bhk || property.type || "—"}

            </h3>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaRulerCombined className="text-3xl text-green-600 mb-3" />

            <p className="text-gray-500">

              Area

            </p>

            <h3 className="text-xl font-bold">

              {property.area}

            </h3>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaBuilding className="text-3xl text-green-600 mb-3" />

            <p className="text-gray-500">

              Builder

            </p>

            <h3 className="text-xl font-bold">

              {property.builder}

            </h3>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaMoneyBillWave className="text-3xl text-green-600 mb-3" />

            <p className="text-gray-500">

              Status

            </p>

            <h3 className="text-xl font-bold">

              {property.propertyStatus}

            </h3>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <FaMoneyBillWave className="text-3xl text-green-600 mb-3" />

            <p className="text-gray-500">

              Sale Type

            </p>

            <h3 className="text-xl font-bold">

              {property.saleType}

            </h3>

          </div>

        </div>

      </section>

      {/* ================= DESCRIPTION ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-6">

            Property Description

          </h2>

          <p className="text-gray-600 leading-8">

            {property.description}

          </p>

        </div>

      </section>
      {/* ================= AMENITIES ================= */}

<section className="max-w-7xl mx-auto px-6 pb-20">

  <h2 className="text-3xl font-bold mb-8">

    Amenities

  </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

    {property.amenities.map((item, index) => (

      <div
        key={index}
        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:-translate-y-2 transition duration-300"
      >

        <div className="text-4xl text-green-700 mb-4">

          {amenityIcons[item]}

        </div>

        <h3 className="font-semibold text-lg">

          {item}

        </h3>

      </div>

    ))}

  </div>

</section>

{/* ================= GOOGLE MAP ================= */}

<section className="max-w-7xl mx-auto px-6 pb-20">

  <h2 className="text-3xl font-bold mb-8">

    Property Location

  </h2>

  <iframe
    src={property.map}
    width="100%"
    height="450"
    loading="lazy"
    allowFullScreen
    className="rounded-2xl shadow-xl"
    title="Google Map"
  ></iframe>

</section>

{/* ================= VIDEO ================= */}

<section className="max-w-7xl mx-auto px-6 pb-20">

  <h2 className="text-3xl font-bold mb-8">

    Property Video

  </h2>

  {/* <iframe
    src=
    width="100%"
    height="500"
    allowFullScreen
    className="rounded-2xl shadow-xl"
    title="Property Video"
  ></iframe> */}
  <video
    src={property.video}
    width="100%"
    height="500"
    controls
    muted
    loop
    playsInline
    className="w-full lg:h-[480px] md:h-[300px] h-[230px] object-cover rounded-2xl shadow-xl"
  />

</section>

{/* ================= VIRTUAL TOUR ================= */}

<section className="max-w-7xl mx-auto px-6 pb-20">

  <div className="bg-green-700 rounded-2xl p-10 text-center text-white">

    <h2 className="text-3xl font-bold">

      Experience 360° Virtual Tour

    </h2>

    <p className="mt-4 text-lg">

      Explore every corner of this property from your home.

    </p>

    <a
      href={property.virtualTour}
      target="_blank"
      rel="noreferrer"
      className="inline-block mt-8 bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
    >
      View Virtual Tour
    </a>

  </div>

</section>

{/* ================= BOOK VISIT ================= */}

<section className="max-w-7xl mx-auto px-6 pb-24">

  <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">

    <div>

      <h2 className="text-3xl font-bold">

        Interested in this Property?

      </h2>

      <p className="text-gray-500 mt-3">

        Schedule a site visit or contact our property expert today.

      </p>

    </div>

    <div className="flex gap-4">

    

    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="px-4 bg-green-700 hover:bg-green-800 text-white  py-3 rounded-lg text-center"
    >
      Enquiry Now
    </a>
      <a
      href={`tel:${phoneNumber}`}
      className="px-4  text-green-800 border border-green-800 py-3 rounded-lg text-center"
    >
      Call Now
    </a>

    </div>

  </div>

</section>
{/* ================= FAQ ================= */}

<section className="max-w-7xl mx-auto px-6 pb-20">

  <h2 className="text-3xl font-bold mb-8">
    Frequently Asked Questions
  </h2>

  <div className="space-y-4">

    {property.faq?.map((item, index) => (

      <div
        key={index}
        className="bg-white rounded-xl shadow"
      >

        <button
          onClick={() =>
            setOpenFAQ(
              openFAQ === index ? null : index
            )
          }
          className="w-full flex justify-between items-center p-5 text-left"
        >

          <span className="font-semibold text-lg">

            {item.question}

          </span>

          <span className="text-2xl">

            {openFAQ === index ? "-" : "+"}

          </span>

        </button>

        {openFAQ === index && (

          <div className="px-5 pb-5 text-gray-600 leading-7">

            {item.answer}

          </div>

        )}

      </div>

    ))}

  </div>

</section>
{/* ================= MOBILE CTA ================= */}

<div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 md:hidden">

  <div className="flex gap-4">

    <a
      href={`tel:${phoneNumber}`}
      className="flex-1 bg-green-700 text-white py-3 rounded-lg text-center"
    >
      Call Now
    </a>

    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="flex-1 bg-black text-white py-3 rounded-lg text-center"
    >
      Enquiry Now
    </a>

  </div>

</div>
<section className="max-w-7xl mx-auto px-6 pb-10">

   <div className="bg-gray-50 rounded-2xl p-8">

      <h2 className="text-3xl font-bold mb-5">
         {property.seo.title}
      </h2>

      <p className="text-gray-600 leading-8">
         {property.seo.content}
      </p>

   </div>

</section>

    </div>
  );
};

export default PropertyDetails;