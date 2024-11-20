import "./khamidEnglishPage.css";
import DropDownButton from "./khamidDropDownButton";

const KhamidFiltersDiv = () => {
  return (
    <div className="h-full">
      <div className="flex h-full">
        <button className="w-full  m-2 bg-sky-200 rounded-2xl hover:bg-orange-200">
          <DropDownButton
            label="Payment Status"
            options={["Full Paid", "Not Full", "Not Paid"]}
          />
        </button>
        <button className=" w-full  m-2 bg-sky-200 rounded-2xl hover:bg-orange-200">
          <DropDownButton
            label="Tutor"
            options={["David", "Bob", "Kobuljon"]}
          />
        </button>

        {/* As we had already a sidebar for levels, wee removed the level's filter */}
        {/* <button className="w-full h-7 m-2 bg-sky-200 rounded-2xl hover:bg-orange-200">
          <DropDownButton
            label="Level"
            options={levels.map((level) => level)}
          />
        </button> */}

        <button className="w-full  m-2 bg-sky-200 rounded-2xl hover:bg-orange-200">
          <DropDownButton label="Day" options={["Mondays", "Tuesdays"]} />
        </button>
        <button className="w-full  m-2 bg-sky-200 rounded-2xl hover:bg-orange-200">
          <DropDownButton label="Time" options={["10-12", "2-4", "4-6"]} />
        </button>
      </div>
    </div>
  );
};

export default KhamidFiltersDiv;
