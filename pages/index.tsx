import { useState, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { IoChatbubbleSharp } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LuClock4 } from "react-icons/lu";
import { LuVideo } from "react-icons/lu";
import { PiDogFill } from "react-icons/pi";
import { PiPiggyBankFill } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";

function App() {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Buddy",
      species: "Dog",
      breed: "Golden Retriever",
      age: 3,
      gender: "Male",
      image: "https://placehold.co/600x400/jpeg",
      insuranceDetails: {
        policyNumber: "PET123456",
        coverage: "Accident & Illness",
        deductible: "$250",
        reimbursement: "80%",
        monthlyPremium: "$42.50",
        startDate: "2023-05-01",
      },
      claims: [
        {
          id: 1,
          date: "2023-11-15",
          type: "Accident",
          description: "Broken leg from a fall",
          amount: "$1,200",
          status: "Approved",
        },
        {
          id: 2,
          date: "2023-10-10",
          type: "Illness",
          description: "Parvovirus infection",
          amount: "$800",
          status: "Approved",
        },
      ],
      documents: [
        {
          id: 1,
          name: "Buddy_ClaimForm.pdf",
          type: "Claim Form",
          date: "2023-11-20",
        },
        {
          id: 2,
          name: "Buddy_VetReport.pdf",
          type: "Veterinary Report",
          date: "2023-11-15",
        },
      ],
    },
    {
      id: 2,
      name: "Whiskers",
      species: "Cat",
      breed: "Siamese",
      age: 5,
      gender: "Female",
      image: "https://placehold.co/600x400/jpeg",
      insuranceDetails: {
        policyNumber: "PET789012",
        coverage: "Accident & Illness",
        deductible: "$200",
        reimbursement: "70%",
        monthlyPremium: "$38.75",
        startDate: "2022-03-15",
      },
      claims: [
        {
          id: 1,
          date: "2023-09-20",
          type: "Illness",
          description: "Urinary tract infection",
          amount: "$500",
          status: "Approved",
        },
      ],
      documents: [
        {
          id: 1,
          name: "Whiskers_ClaimForm.pdf",
          type: "Claim Form",
          date: "2023-09-25",
        },
      ],
    },
  ]);

  const [activePetId, setActivePetId] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeChatPet, setActiveChatPet] = useState(pets[0]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showPetDetailsModal, setShowPetDetailsModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [showVideoWindow, setShowVideoWindow] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      petId: 1,
      messages: [
        {
          id: 1,
          sender: "You",
          text: "Hello, I'm interested in filing a claim.",
          time: "2023-11-20 10:30 AM",
        },
        {
          id: 2,
          sender: "Agent",
          text: "Sure, I can help you with that. Can you please provide your policy number?",
          time: "2023-11-20 10:32 AM",
        },
        {
          id: 3,
          sender: "You",
          text: "It's PET123456.",
          time: "2023-11-20 10:33 AM",
        },
        {
          id: 4,
          sender: "Agent",
          text: "Thank you. What is the nature of the claim?",
          time: "2023-11-20 10:35 AM",
        },
        {
          id: 5,
          sender: "You",
          text: "My pet had an accident and broke a leg.",
          time: "2023-11-20 10:36 AM",
        },
        {
          id: 6,
          sender: "Agent",
          text: "I'm so sorry to hear that. Please hold on while I check on the status.",
          time: "2023-11-20 10:38 AM",
        },
        {
          id: 7,
          sender: "Agent",
          text: "Your claim has been approved. You will receive the reimbursement soon.",
          time: "2023-11-20 10:40 AM",
        },
        {
          id: 8,
          sender: "You",
          text: "Thank you so much for your help!",
          time: "2023-11-20 10:42 AM",
        },
      ],
    },
    {
      id: 2,
      petId: 2,
      messages: [
        {
          id: 1,
          sender: "You",
          text: "Hi, I need some information about my policy.",
          time: "2023-10-15 2:45 PM",
        },
        {
          id: 2,
          sender: "Agent",
          text: "Of course! What would you like to know?",
          time: "2023-10-15 2:47 PM",
        },
        {
          id: 3,
          sender: "You",
          text: "What is the deductible for my pet's policy?",
          time: "2023-10-15 2:48 PM",
        },
        {
          id: 4,
          sender: "Agent",
          text: "The deductible is $200.",
          time: "2023-10-15 2:50 PM",
        },
        {
          id: 5,
          sender: "You",
          text: "Okay, got it. Thanks for the info.",
          time: "2023-10-15 2:52 PM",
        },
      ],
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatWindowRef = useRef(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumAmount, setPremiumAmount] = useState("");
  const [premiumDueDate, setPremiumDueDate] = useState("");
  const [showClaimDetailsModal, setShowClaimDetailsModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showDocumentViewerModal, setShowDocumentViewerModal] = useState(false);
  const [selectedDocumentFile, setSelectedDocumentFile] = useState(null);

  const handleAddPet = (e) => {
    e.preventDefault();
    const form = e.target;
    const newPet = {
      id: pets.length + 1,
      name: form.name.value,
      species: form.species.value,
      breed: form.breed.value,
      age: parseInt(form.age.value),
      gender: form.gender.value,
      image: form.photo.files[0]
        ? URL.createObjectURL(form.photo.files[0])
        : "https://placehold.co/600x400/jpeg",
      insuranceDetails: {
        policyNumber: `PET${Math.floor(100000 + Math.random() * 900000)}`,
        coverage: "Accident & Illness",
        deductible: "$250",
        reimbursement: "80%",
        monthlyPremium: "$42.50",
        startDate: new Date().toISOString().slice(0, 10),
      },
      claims: [],
      documents: [],
    };
    setPets([...pets, newPet]);
    setActivePetId(newPet.id);
    setShowAddPetModal(false);
    form.reset();
  };

  const handlePetClick = (petId) => {
    setActivePetId(petId);
    const pet = pets.find((p) => p.id === petId);
    if (pet) {
      setActiveChatPet(pet);
    }
  };

  const handleFileUpload = (e, petId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64File = e.target.result.split(",")[1];
        const newDocument = {
          id: Date.now(),
          name: file.name,
          type: file.type,
          date: new Date().toISOString().slice(0, 10),
          content: base64File,
        };
        setPets(
          pets.map((pet) =>
            pet.id === petId
              ? { ...pet, documents: [...pet.documents, newDocument] }
              : pet
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const petMessages = chatMessages.find(
      (cm) => cm.petId === activeChatPet.id
    );
    const newChatMessage = {
      id: petMessages ? petMessages.messages.length + 1 : 1,
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleString(),
    };

    if (petMessages) {
      setChatMessages(
        chatMessages.map((cm) =>
          cm.petId === activeChatPet.id
            ? { ...cm, messages: [...cm.messages, newChatMessage] }
            : cm
        )
      );
    } else {
      setChatMessages([
        ...chatMessages,
        { petId: activeChatPet.id, messages: [newChatMessage] },
      ]);
    }

    setNewMessage("");
  };

  const handleRefundSubmit = (e) => {
    e.preventDefault();
    setShowRefundModal(false);
    setRefundAmount("");
    setRefundReason("");
  };

  const handlePremiumSubmit = (e) => {
    e.preventDefault();
    setShowPremiumModal(false);
    setPremiumAmount("");
    setPremiumDueDate("");
  };

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newClaim = {
      id: activePet.claims.length + 1,
      date: form.date.value,
      type: form.type.value,
      description: form.description.value,
      amount: form.amount.value,
      status: "Pending",
    };
    setPets(
      pets.map((pet) =>
        pet.id === activePetId
          ? { ...pet, claims: [...pet.claims, newClaim] }
          : pet
      )
    );
    setShowClaimModal(false);
    form.reset();
  };

  const handleDocumentSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newDocument = {
      id: activePet.documents.length + 1,
      name: form.name.value,
      type: form.type.value,
      date: form.date.value,
    };
    setPets(
      pets.map((pet) =>
        pet.id === activePetId
          ? { ...pet, documents: [...pet.documents, newDocument] }
          : pet
      )
    );
    setShowDocumentModal(false);
    form.reset();
  };

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim);
    setShowClaimDetailsModal(true);
  };

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setShowDocumentViewerModal(true);
  };

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop =
        chatWindowRef.current.scrollHeight - chatWindowRef.current.clientHeight;
    }
  };

  useState(() => {
    scrollToBottom();
  }, [chatMessages]);

  const activePet = pets.find((pet) => pet.id === activePetId);

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <div className="hidden md:block w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white p-6">
        <div className="flex items-center mb-8">
          <FaPaw className="text-3xl mr-2" />
          <h1 className="text-2xl font-bold">Pet Insurance</h1>
        </div>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "overview"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-white hover:bg-blue-700"
              }`}
            >
              Overview
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("pets")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "pets"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-white hover:bg-blue-700"
              }`}
            >
              My Pets
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("claims")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "claims"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-white hover:bg-blue-700"
              }`}
            >
              Claims
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("documents")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "documents"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-white hover:bg-blue-700"
              }`}
            >
              Documents
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("community")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "community"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-white hover:bg-blue-700"
              }`}
            >
              Community
            </button>
          </li>
        </ul>
      </div>

      <div className="md:hidden bg-blue-600 text-white p-4">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Menu
        </button>
        {showSidebar && (
          <div className="fixed top-0 left-0 w-64 bg-blue-600 text-white p-6 z-50">
            <button
              onClick={() => setShowSidebar(false)}
              className="mb-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
            <div className="flex items-center mb-8">
              <FaPaw className="text-3xl mr-2" />
              <h1 className="text-2xl font-bold">Pet Insurance</h1>
            </div>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => {
                    setActiveTab("overview");
                    setShowSidebar(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "overview"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("pets");
                    setShowSidebar(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "pets"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  My Pets
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("claims");
                    setShowSidebar(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "claims"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  Claims
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("documents");
                    setShowSidebar(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "documents"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  Documents
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("community");
                    setShowSidebar(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "community"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  Community
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      <div className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "pets" && "My Pets"}
            {activeTab === "claims" && "Claims History"}
            {activeTab === "documents" && "Documents"}
            {activeTab === "community" && "Community"}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                <FaBell className="text-xl" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b">
                    <h2 className="font-bold">Notifications</h2>
                  </div>
                  <div className="p-4">
                    <p>No new notifications</p>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                <FaUserFriends className="text-xl" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b">
                    <h2 className="font-bold">John Doe</h2>
                    <p className="text-sm text-gray-600">Policy Holder</p>
                  </div>
                  <ul className="p-4">
                    <li className="py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          setActiveTab("pets");
                        }}
                        className="w-full text-left"
                      >
                        My Account
                      </button>
                    </li>
                    <li className="py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          setActiveTab("claims");
                        }}
                        className="w-full text-left"
                      >
                        My Claims
                      </button>
                    </li>
                    <li className="py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          setActiveTab("documents");
                        }}
                        className="w-full text-left"
                      >
                        Documents
                      </button>
                    </li>
                    <li className="py-2">
                      <button
                        onClick={() => setShowUserMenu(false)}
                        className="w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Your Pets
              </h2>
              {pets.length === 0 ? (
                <p className="text-gray-600">No pets found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pets.map((pet) => (
                    <div
                      key={pet.id}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                        activePetId === pet.id
                          ? "bg-blue-50 border-l-4 border-blue-600 shadow-md"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => handlePetClick(pet.id)}
                    >
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800">{pet.name}</h3>
                        <p className="text-sm text-gray-600">
                          {pet.species} - {pet.breed}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowAddPetModal(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                <FaPlus className="inline-block mr-2" /> Add New Pet
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {pets.map((pet) =>
                  pet.claims.map((claim) => (
                    <div
                      key={claim.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-bold text-gray-800">
                          Claim for {pet.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {claim.date} - {claim.type}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          claim.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : claim.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {claim.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={() => setActiveTab("claims")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                View All Claims
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Refunds & Savings
              </h2>
              <div className="flex flex-col items-center justify-center h-40 bg-blue-50 rounded-lg">
                <PiPiggyBankFill className="text-3xl text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-800">
                  Total Savings: $1,200
                </h3>
                <p className="text-sm text-gray-600">
                  Last refund: $500 on 2023-11-20
                </p>
              </div>
              <button
                onClick={() => setShowRefundModal(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                Request Refund
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Premium Payments
              </h2>
              <div className="flex flex-col items-center justify-center h-40 bg-blue-50 rounded-lg">
                <LiaFileInvoiceDollarSolid className="text-3xl text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-800">
                  Next Payment: $42.50
                </h3>
                <p className="text-sm text-gray-600">Due on 2023-12-01</p>
              </div>
              <button
                onClick={() => setShowPremiumModal(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                Pay Premium
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Community Stats
              </h2>
              <div className="flex flex-col items-center justify-center h-40 bg-blue-50 rounded-lg">
                <FaUsers className="text-3xl text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-800">
                  Total Claims: 1,234
                </h3>
                <p className="text-sm text-gray-600">
                  Approved: 90% | Pending: 8% | Denied: 2%
                </p>
              </div>
              <button
                onClick={() => setActiveTab("community")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                View Community
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Promotions
              </h2>
              <div className="flex flex-col items-center justify-center h-40 bg-blue-50 rounded-lg">
                <FaPlus className="text-3xl text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-800">
                  Get 10% off your next premium
                </h3>
                <p className="text-sm text-gray-600">
                  Use code PET10 at checkout
                </p>
              </div>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
                View All Promotions
              </button>
            </div>
          </div>
        )}

        {activeTab === "pets" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-24 h-24 rounded-full mr-4 object-cover mb-4 md:mb-0"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                      {pet.name}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      {pet.species} - {pet.breed}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold text-gray-800">Age</h3>
                        <p className="text-gray-600">{pet.age} years</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Gender</h3>
                        <p className="text-gray-600">{pet.gender}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">
                          Policy Number
                        </h3>
                        <p className="text-gray-600">
                          {pet.insuranceDetails.policyNumber}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Coverage</h3>
                        <p className="text-gray-600">
                          {pet.insuranceDetails.coverage}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => {
                          setSelectedPet(pet);
                          setShowPetDetailsModal(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handlePetClick(pet.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                      >
                        Open Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center">
              <FaPlus className="text-3xl text-blue-600 mb-4" />
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                Add New Pet
              </h2>
              <p className="text-gray-600 mb-4">
                Click the button below to add a new pet to your account.
              </p>
              <button
                onClick={() => setShowAddPetModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Add Pet
              </button>
            </div>
          </div>
        )}

        {activeTab === "claims" && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Claims History
            </h2>
            {pets.map((pet) =>
              pet.claims.length === 0 ? (
                <p key={pet.id} className="text-gray-600 mb-4">
                  No claims found for {pet.name}.
                </p>
              ) : (
                pet.claims.map((claim) => (
                  <div
                    key={claim.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4 cursor-pointer"
                    onClick={() => handleClaimClick(claim)}
                  >
                    <div>
                      <h3 className="font-bold text-gray-800">
                        Claim for {pet.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {claim.date} - {claim.type}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        claim.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : claim.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {claim.status}
                    </span>
                  </div>
                ))
              )
            )}
            <button
              onClick={() => setShowClaimModal(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              <FaPlus className="inline-block mr-2" /> Submit New Claim
            </button>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Documents</h2>
            {pets.map((pet) =>
              pet.documents.length === 0 ? (
                <p key={pet.id} className="text-gray-600 mb-4">
                  No documents found for {pet.name}.
                </p>
              ) : (
                pet.documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4 cursor-pointer"
                    onClick={() => handleDocumentClick(document)}
                  >
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {document.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {document.date} - {document.type}
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4H7m6 4h.01M21 12h.01"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              )
            )}
            <button
              onClick={() => setShowDocumentModal(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
            >
              <FaPlus className="inline-block mr-2" /> Upload New Document
            </button>
          </div>
        )}

        {activeTab === "community" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Community Forum
              </h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <FaUsers className="text-3xl text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Pet Owners Group
                    </h3>
                    <p className="text-sm text-gray-600">
                      1,234 members | 456 posts
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <FaUsers className="text-3xl text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Pet Health Discussions
                    </h3>
                    <p className="text-sm text-gray-600">
                      567 members | 123 posts
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <FaUsers className="text-3xl text-blue-600 mr-4" />
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Pet Insurance Experts
                    </h3>
                    <p className="text-sm text-gray-600">
                      123 members | 45 posts
                    </p>
                  </div>
                </div>
              </div>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
                Join Community
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Recent Discussions
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-800">
                    Best pet insurance for dogs?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Asked by John D. | 2 hours ago | 5 replies
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-800">
                    Has anyone used Nationwide Pet Insurance?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Asked by Jane S. | 1 day ago | 3 replies
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-gray-800">
                    Tips for filing a claim
                  </h3>
                  <p className="text-sm text-gray-600">
                    Asked by Mike T. | 3 days ago | 7 replies
                  </p>
                </div>
              </div>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
                Start a Discussion
              </button>
            </div>
          </div>
        )}
      </div>

      {showAddPetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Add New Pet
            </h2>
            <form onSubmit={handleAddPet}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="species"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Species
                </label>
                <select
                  id="species"
                  name="species"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select Species</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="breed"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="age"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="photo"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddPetModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Add Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPetDetailsModal && selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Pet Details - {selectedPet.name}
            </h2>
            <div className="flex flex-col md:flex-row items-center mb-4">
              <img
                src={selectedPet.image}
                alt={selectedPet.name}
                className="w-24 h-24 rounded-full mr-4 object-cover mb-4 md:mb-0"
              />
              <div>
                <p className="text-lg text-gray-600 mb-2">
                  Species: {selectedPet.species}
                </p>
                <p className="text-lg text-gray-600 mb-2">
                  Breed: {selectedPet.breed}
                </p>
                <p className="text-lg text-gray-600 mb-2">
                  Age: {selectedPet.age} years
                </p>
                <p className="text-lg text-gray-600 mb-2">
                  Gender: {selectedPet.gender}
                </p>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-800">
              Insurance Details
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Policy Number:</span>{" "}
                {selectedPet.insuranceDetails.policyNumber}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Coverage:</span>{" "}
                {selectedPet.insuranceDetails.coverage}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Deductible:</span>{" "}
                {selectedPet.insuranceDetails.deductible}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Reimbursement:</span>{" "}
                {selectedPet.insuranceDetails.reimbursement}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Monthly Premium:</span>{" "}
                {selectedPet.insuranceDetails.monthlyPremium}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Start Date:</span>{" "}
                {selectedPet.insuranceDetails.startDate}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPetDetailsModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showClaimModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Submit New Claim
            </h2>
            <form onSubmit={handleClaimSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Accident">Accident</option>
                  <option value="Illness">Illness</option>
                  <option value="Routine Care">Routine Care</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowClaimModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Submit Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Upload New Document
            </h2>
            <form onSubmit={handleDocumentSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Claim Form">Claim Form</option>
                  <option value="Veterinary Report">Veterinary Report</option>
                  <option value="Receipt">Receipt</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowDocumentModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Upload Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showClaimDetailsModal && selectedClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Claim Details
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Date:</span> {selectedClaim.date}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Type:</span> {selectedClaim.type}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Description:</span>{" "}
                {selectedClaim.description}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Amount:</span>{" "}
                {selectedClaim.amount}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Status:</span>{" "}
                {selectedClaim.status}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowClaimDetailsModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDocumentViewerModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-2/3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              View Document
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Name:</span> {selectedDocument.name}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Type:</span> {selectedDocument.type}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Date:</span> {selectedDocument.date}
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDocumentViewerModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showRefundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Request Refund
            </h2>
            <form onSubmit={handleRefundSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="refundAmount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Refund Amount
                </label>
                <input
                  type="number"
                  id="refundAmount"
                  name="refundAmount"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="refundReason"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Reason for Refund
                </label>
                <textarea
                  id="refundReason"
                  name="refundReason"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowRefundModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Request Refund
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPremiumModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Pay Premium
            </h2>
            <form onSubmit={handlePremiumSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="premiumAmount"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Premium Amount
                </label>
                <input
                  type="number"
                  id="premiumAmount"
                  name="premiumAmount"
                  value={premiumAmount}
                  onChange={(e) => setPremiumAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="premiumDueDate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="premiumDueDate"
                  name="premiumDueDate"
                  value={premiumDueDate}
                  onChange={(e) => setPremiumDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowPremiumModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Pay Premium
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showChatWindow && activeChatPet && (
        <div className="fixed bottom-4 right-4 w-80 md:w-96 h-128 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col z-50">
          <div className="bg-blue-600 p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={activeChatPet.image}
                alt={activeChatPet.name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-white">
                  {activeChatPet.name}
                </h3>
                <p className="text-sm text-white">Online</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowVideoWindow(!showVideoWindow)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
              >
                <LuVideo className="text-xl" />
              </button>
              <button
                onClick={() => setShowChatWindow(false)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
              >
                <BsThreeDots className="text-xl" />
              </button>
            </div>
          </div>
          <div
            ref={chatWindowRef}
            className="flex-1 p-4 overflow-y-auto space-y-4"
          >
            {chatMessages
              .find((cm) => cm.petId === activeChatPet.id)
              ?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${
                      message.sender === "You"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
          </div>
          <form onSubmit={handleChatSubmit} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                <TiMessages className="text-xl" />
              </button>
            </div>
          </form>
        </div>
      )}

      {showVideoWindow && activeChatPet && (
        <div className="fixed bottom-4 right-4 w-80 md:w-96 h-128 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col z-50">
          <div className="bg-blue-600 p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={activeChatPet.image}
                alt={activeChatPet.name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-white">
                  {activeChatPet.name}
                </h3>
                <p className="text-sm text-white">Online</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowChatWindow(!showChatWindow)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
              >
                <IoChatbubbleSharp className="text-xl" />
              </button>
              <button
                onClick={() => setShowVideoWindow(false)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
              >
                <BsThreeDots className="text-xl" />
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Video Consult
            </h3>
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <p className="text-gray-600">Video call in progress...</p>
            </div>
            <button
              onClick={() => setShowVideoWindow(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
// Zod Schema
export const Schema = {
  commentary:
    "This is a pet insurance dashboard where customers can view a headline summary of their insured pets, refunds and savings; upload vet paperwork or start a chat / video consult in one click; track recent reimbursements in a timeline; and browse community‑wide stats plus promotional banners — all inside a clean, two‑column layout with a blue‑and‑white brand palette.",
  template: "nextjs-developer",
  title: "Pet Insurance Dashboard",
  description:
    "A pet insurance dashboard with a two‑column layout and blue‑and‑white brand palette.",
  additional_dependencies: ["react-icons"],
  has_additional_dependencies: true,
  install_dependencies_command: "npm install react-icons",
  port: 3000,
  file_path: "pages/index.tsx",
  code: "<see code above>",
};
