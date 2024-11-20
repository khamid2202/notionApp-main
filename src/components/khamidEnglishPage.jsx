import "./khamidEnglishPage.css";
import { useNavigate } from "react-router-dom";

const levels = [
  "Kid1",
  "Kid2",
  "Kid3",
  "Kid4",
  "Kid5",
  "Kid6",
  "Prim1",
  "Prim2",
  "Pret1",
  "Pret2",
  "TOEFL1",
  "TOEFL2",
  "Intensive",
];

function EnglishPage() {
  const navigate = useNavigate();

  const handleClick = (level) => {
    navigate(`/department/?level=${level}`);
  };
  const handleClearClick = () => {
    navigate("/department");
  };
  return (
    <>
      <div className="mainDiv flex  p-2">
        <div className="levelsDiv  h-full p-1">
          <ul className="space-y-3 w-full">
            {levels.map((level) => (
              <li key={level} className="w-full">
                <button
                  className="w-full h-10 bg-sky-200 rounded-xl hover:bg-orange-200 px-4"
                  onClick={() => handleClick(level)}
                >
                  {level}
                </button>
              </li>
            ))}
            <button
              className="w-full h-10 bg-sky-200 rounded-xl hover:bg-orange-200 px-4"
              onClick={() => handleClearClick()}
            >
              Clear
            </button>
          </ul>
        </div>
        {/* <div className="divRight w-5/6 h-screen bg-stone-100">
          <div className="flex bg-sky-100">
            <button className="w-full h-7 m-2 bg-sky-200 rounded-2xl hover:bg-orange-200">
              <DropDownButton
                label="Payment Status"
                options={["Paid", "Unpaid", "Not full"]}
              />
            </button>
            <button className=" w-full h-7 m-2 bg-sky-200 rounded-2xl hover:bg-orange-200">
              <DropDownButton
                label="Tutor"
                options={["David", "Bob", "Kobuljon"]}
              />
            </button>
            <button className="w-full h-7 m-2 bg-sky-200 rounded-2xl hover:bg-orange-200">
              <DropDownButton
                label="Level"
                options={levels.map((level) => level)}
              />
            </button>
            <button className="w-full h-7 m-2 bg-sky-200 rounded-2xl hover:bg-orange-200">
              <DropDownButton label="Day" options={["Mondays", "Tuesdays"]} />
            </button>
            <button className="w-full h-7 m-2 bg-sky-200 rounded-2xl hover:bg-orange-200">
              <DropDownButton label="Time" options={["10-12", "2-4", "4-6"]} />
            </button>
          </div>
          {/* <div>THe table</div> 
        </div> */}
      </div>
    </>
  );
}

export default EnglishPage;
