import { FiClock, FiCalendar } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";

type deuCorentday = {
  title: string;
  description: string;
  teacher: string;
  dueTime: string;
};
type comingUp = {
  title: string;
  description: string;
  teacher: string;
  dueDate: string;
};
type Props = {
  deuCorentday: deuCorentday[];
  comingUp: comingUp[];
};

const Profile_Assignment = ({ deuCorentday, comingUp }: Props) => {
  return (
    <div className="p-4 space-y-6 ">
      {/* Due Today Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Due Today
          </h2>
        </div>

        <div className="p-4 space-y-4">
          {deuCorentday.map((dueToday, i) => (
            <div key={i} className="flex items-start">
              <div className="flex-1">
                <h3 className="font-medium text-[#3B7A9B] dark:text-gray-100 flex items-center text-[16px]">
                  <p className="-ml-1 text-red-600">
                    <GoDotFill></GoDotFill>
                  </p>
                  {dueToday.title}
                </h3>
                <p className="text-[16px] text-gray-600 dark:text-gray-400">
                  {dueToday.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {dueToday.teacher}
                </p>
              </div>
              {dueToday.dueTime && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiClock className="mr-1" />
                  {dueToday.dueTime}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Coming Up Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Coming Up
          </h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {comingUp.map((task, index) => (
            <div key={index} className="p-4">
              <div className="flex flex-row items-center justify-between">
                <div className="flex-1 mb-2 sm:mb-0">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {task.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {task.teacher}
                  </p>
                </div>
                {task.dueDate && (
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiCalendar className="mr-1" />
                    {task.dueDate}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile_Assignment;
