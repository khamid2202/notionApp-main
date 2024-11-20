import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { EyeFilledIcon } from "../public/images/EyeFilled1";
import { EyeSlashFilledIcon } from "../public/images/EyesFilled";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpenChange } = useDisclosure();
  const [timer, setTimer] = useState("");
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (countdown === null) return;

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          return null;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (countdown !== null) {
      const hours = Math.floor(countdown / 3600);
      const minutes = Math.floor((countdown % 3600) / 60);
      const seconds = countdown % 60;

      setTimer(
        `${hours > 0 ? `${hours} hours ` : ""}${
          minutes > 0 ? `${minutes} minutes ` : ""
        }${seconds > 0 ? `${seconds} seconds ` : ""}`
      );
    }
  }, [countdown]);

  const handleLogin = async (username, password) => {
    try {
      loading.onOpen();
      const response = await axios.post(
        "https://aura-production-24d6.up.railway.app/teachers/login",
        {
          username: username,
          password: password,
        }
      );
      const data = response.data;
      console.log(data);
      if (data) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("expire_at", data.expire_at);
        localStorage.setItem("first_name", data.first_name);
        localStorage.setItem("teacher_id", data.last_name);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.wait_time) {
        const wait_time =
          error.response.data.wait_time.hours * 3600 +
          error.response.data.wait_time.minutes * 60 +
          error.response.data.wait_time.seconds;
        setCountdown(wait_time);
      } else {
        setTimer("");
      }
      onOpenChange();
    } finally {
      loading.onClose();
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loading = useDisclosure();
  const inputRef = React.useRef(null);

  return (
    <div className="flex justify-center items-center ">
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        placement="center"
        onKeyDown={(e) => e.key === "Enter" && onOpenChange()}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 justify-center items-center">
                Error
              </ModalHeader>
              <ModalBody className="flex flex-col gap-1 justify-center items-center">
                <p className="text-red-600 font-bold text-center">
                  {countdown
                    ? `Please wait for ${timer} to try again`
                    : "Invalid Password or Username"}
                </p>
              </ModalBody>
              <ModalFooter className="flex flex-col gap-1 justify-center items-center">
                <Button color="danger" variant="shadow" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className=" flex flex-col gap-4 bg-white/30 shadow-xl border border-white/20 backdrop-blur-lg items-center w-[300px] p-10 pb-2 rounded-2xl lg:w-[500px]">
        <div className="flex justify-center items-center w-[200px] h-[200px]">
          <img
            src="./images/security1.png"
            alt=""
            className="select-none"
            draggable="false"
          />
        </div>
        <Input
          type="email"
          variant="underlined"
          placeholder="Enter your username"
          label="Username"
          color="warning"
          isRequired
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.focus()}
        />
        <Input
          ref={inputRef}
          label="Password"
          variant="underlined"
          isRequired
          color="warning"
          placeholder="Enter your password"
          onKeyDown={(e) =>
            e.key === "Enter" && handleLogin(username, password)
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <Button
          className="mb-3"
          color="warning"
          variant="shadow"
          onClick={() => handleLogin(username, password)}
          isLoading={loading.isOpen}
        >
          Log in
        </Button>
      </div>
    </div>
  );
}

export default App;
