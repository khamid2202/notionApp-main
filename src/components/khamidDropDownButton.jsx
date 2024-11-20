import PropTypes from "prop-types";
// import { useState } from "react";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function DropDownButton({ label, options }) {
  const navigate = useNavigate();
  const [values, setValues] = React.useState(new Set([]));

  const handleSelectionChange = (e) => {
    setValues(new Set(e.target.value.split(",")));
  };

  const handleClick = () => {
    navigate("/department");
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Select
        size="sm"
        className="min-w-0"
        label={label}
        selectionMode="multiple"
        // placeholder="Select one or more"
        selectedKeys={values}
        // className="max-w-xs"
        onChange={handleSelectionChange}
      >
        {options.map((option) => (
          <SelectItem onClick={handleClick(option)} key={option.key}>
            {option}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

// return (

//   // <Menu as="div">
//   //   <MenuButton className={"w-full inline-flex"}>
//   //     <span className="w-full text-center">{label}</span>
//   //     <ChevronDownIcon
//   //       aria-hidden="true"
//   //       className="mr-1 size-5 text-gray-400"
//   //     />
//   //   </MenuButton>
//   //   <MenuItems transition className="absolute p-2">
//   //     <div className="z-30 flex flex-col bg-sky-100 px-2">
//   //       {options.map((option) => (
//   //         <MenuItem
//   //           key={option}
//   //           className="w-full px-4 mb-1 rounded-xl border-black border-1 bg-sky-200 hover:bg-orange-200"
//   //         >
//   //           <button onClick={() => HandleClick()}>{option}</button>
//   //         </MenuItem>
//   //       ))}
//   //     </div>
//   //   </MenuItems>
//   // </Menu>
// );

DropDownButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
};

export default DropDownButton;
