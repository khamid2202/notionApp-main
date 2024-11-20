import {
    Avatar,
    Button,
    Popover,
    Input,
    PopoverContent,
    PopoverTrigger,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@nextui-org/react";
  import axios from "axios";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { parsePhoneNumberFromString } from "libphonenumber-js";
  import ChangeUsername from "./ChangeUsername";
  import ChangePassword from "./ChangePassword";
  import { ToastContainer, Zoom, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import "../App.css";
  import "../index.css";
  import Department from "../aura/DepartmentSource/Department";
  const Dashboard = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("Loading...");
    const [tutorId, setTutorId] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false); // New state to control popover visibility
    const [phone, setPhone] = useState([]);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);
    const parsePhoneNumber = (phoneNumber) => {
      if (!phoneNumber) {
        return "";
      }
      const parsed = parsePhoneNumberFromString(phoneNumber, "UZ");
      return parsed ? parsed.formatInternational() : "";
    };
  
    const handleCopyPhoneNumber = (phoneNumber) => {
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          setCopySuccess(true);
          toast.success("Successfully copied!");
          setTimeout(() => setCopySuccess(false), 1000);
        })
        .catch((error) => console.error("Failed to copy phone number: ", error));
    };
  
    useEffect(() => {
      const auth = async () => {
        try {
          const token = localStorage.getItem("access_token");
  
          if (!token) {
            navigate("/login");
          } else {
            const expire_at = localStorage.getItem("expire_at");
            if (expire_at < Date.now() / 1000) {
              navigate("/login");
            }
  
            try {
              const response = await axios.post(
                "https://aura-production-24d6.up.railway.app/teachers/auth",
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              if (response.data) {
                const data = response.data;
                console.log(data);
                if (data.ok) {
                  setFirstName(data.first_name);
                  setTutorId(data.teacher_id);
                  setPhone(data.phone);
                }
              }
            } catch (error) {
              console.log(error);
              navigate("/login");
            }
          }
        } catch (error) {
          console.log(error);
          navigate("/");
        }
      };
  
      auth();
    }, [navigate]);
  
    const handleLogout = () => {
      setIsModalVisible(true);
    };
    const handleChangeUsername = () => {
      setIsUserModalVisible(true);
      setIsPopoverVisible(false); // Hide the popover
    };
    const handleChangePassword = () => {
      setIsPasswordModalVisible(true);
      setIsPopoverVisible(false); // Hide the popover
    };
  
    const confirmLogout = () => {
      setIsModalVisible(false);
      navigate("/login");
      localStorage.removeItem("access_token");
      localStorage.removeItem("expire_at");
    };
  
    const cancelLogout = () => {
      setIsModalVisible(false);
    };
  
    const confirmChangeUsername = async () => {
      setIsUserModalVisible(false);
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const response = await ChangeUsername(newUsername, token, navigate);
          console.log(response);
          if (response) {
            setFirstName(newUsername);
            console.log("Username updated:", response);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("Failed to change username", error);
      }
    };
  
    const confirmChangePassword = async () => {
      setIsPasswordModalVisible(false);
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          const response = await ChangePassword(newPassword, token, navigate);
          console.log(response);
          if (response) {
            console.log("Password updated:", response);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("Failed to change password", error);
      }
    };
  
    return (
      <>
        <div className="flex flex-col sticky top-0 bg-white">
          <div className="flex justify-between items-center w-full p-4">
            <div className="select-none left-0 flex flex-1 gap-4 items-center">
              <Popover
                isOpen={isPopoverVisible}
                onOpenChange={setIsPopoverVisible}
              >
                <PopoverTrigger>
                  <div className="flex gap-4 items-center hover:bg-gray-200 hover:rounded-xl hover:cursor-pointer p-4">
                    <Avatar isBordered radius="full" color="warning" size="sm" />
                    {firstName} {`(A${tutorId})`}
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="bg-[#f5a426] rounded-2xl p-1">
                      <div className="text-small text-center font-bold">
                        Tutor Phone Number
                      </div>
                      <div className="text-tiny font-bold text-center ">
                        {phone.map((phoneNumber, index) => (
                          <div
                            key={index}
                            className="flex justify-center items-center gap-2"
                          >
                            <div key={index}>{parsePhoneNumber(phoneNumber)}</div>
                            <img
                              src="./images/copy.png"
                              alt=""
                              className="w-3 h-3 hover:cursor-pointer"
                              onClick={() =>
                                handleCopyPhoneNumber(
                                  parsePhoneNumber(phoneNumber)
                                )
                              }
                              style={{ color: "gray" }}
                            />
                            {copySuccess}
                          </div>
                        ))}
                      </div>
                    </div>
                    <br />
                    <div className="flex flex-col gap-4">
                      <Button
                        color="warning"
                        variant="shadow"
                        onPress={handleChangeUsername}
                      >
                        Change the Username
                      </Button>
                      <Button
                        color="warning"
                        variant="shadow"
                        onPress={handleChangePassword}
                      >
                        Change the Password
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
  
            <div className="flex justify-center items-center gap-4">
              <Button color="warning" variant="shadow" onPress={handleLogout}>
                Log out
              </Button>
            </div>
          </div>
        </div>
        <div className="flex text-center justify-center">
          <div className="flex flex-col w-full">
            <Department/>
          </div>
        </div>
        {/* Modal for the password change */}
  
        <Modal
          isOpen={isPasswordModalVisible}
          onOpenChange={setIsPasswordModalVisible}
          placement="center"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 justify-center items-center font-bold">
              Change the Password
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                label="New Password"
                variant="underlined"
                color="warning"
                placeholder="New Password"
                value={newPassword} // Bind to newUsername state
                onChange={(e) => setNewPassword(e.target.value)} // Update on input change
              />
            </ModalBody>
            <ModalFooter className="flex items-center justify-center">
              <Button
                color="warning"
                variant="shadow"
                onPress={() => setIsPasswordModalVisible(false)}
              >
                Cancel
              </Button>
              <Button
                color="success"
                variant="shadow"
                onPress={confirmChangePassword}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          closeOnClick
          transition={Zoom}
        />
  
        {/* Modal for changing the username */}
        <Modal
          isOpen={isUserModalVisible}
          onOpenChange={setIsUserModalVisible}
          placement="center"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 justify-center items-center font-bold">
              Change the Username
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2 items-center justify-center">
              <Input
                type="text"
                label="New Username"
                variant="underlined"
                color="warning"
                placeholder="New Username"
                value={newUsername} // Bind to newUsername state
                onChange={(e) => setNewUsername(e.target.value)} // Update on input change
              />
            </ModalBody>
            <ModalFooter className="flex items-center justify-center">
              <Button
                color="warning"
                variant="shadow"
                onPress={() => setIsUserModalVisible(false)}
              >
                Cancel
              </Button>
              <Button
                color="success"
                variant="shadow"
                onPress={confirmChangeUsername}
              >
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  
        {/* Modal for confirming logout */}
        <Modal
          isOpen={isModalVisible}
          onOpenChange={setIsModalVisible}
          placement="center"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 justify-center items-center font-bold">
              Confirm Logout
            </ModalHeader>
            <ModalBody className="flex flex-col gap-2 items-center justify-center text-red-600 font-semibold">
              <p>Are you sure you want to log out?</p>
            </ModalBody>
            <ModalFooter className="flex items-center justify-center">
              <Button color="success" variant="shadow" onPress={cancelLogout}>
                No
              </Button>
              <Button color="danger" variant="shadow" onPress={confirmLogout}>
                Yes, Log out
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default Dashboard;
  