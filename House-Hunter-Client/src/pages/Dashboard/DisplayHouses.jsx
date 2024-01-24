import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import timeStampToDateConverter from "../../utilities/timeStampToDateConverter";
import useAuth from "../../hooks/useAuth";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import Loading from "../../components/shared/Loading";
import useCurrentDate from "../../hooks/useCurrentDate";
import dateComparer from "../../utilities/dateComparer";
import { showAlertOnError } from "../../utilities/displaySweetAlert";
import usePerformMutation from "../../hooks/usePerformMutation";
import Title from "../../components/shared/Title";
import NoData from "../../components/shared/NoData";
import { getUserBasedHouseData } from "../../api/houseAPIs";
import { useForm } from "react-hook-form";
import { MdDescription } from "react-icons/md";

const DisplayHouses = () => {
  const { user, loading } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const today = useCurrentDate();

  const categories = [
    "Demographics",
    "Climate change",
    "Health",
    "Satisfaction",
    "Sports",
    "Experience",
    "Technology",
    "Travel and Adventure ",
    "Current Affairs",
    "Community Service",
    "Entertainment",
    "Corporate",
  ];

  //setting the title
  const title = {
    mainTitle: "Your Houses",
    subTitle: "",
  };

  //fetching owner based house data
  const {
    isLoading,
    data: houses,
    refetch,
  } = useQuery({
    queryKey: ["getUserHouseData"],
    queryFn: () => getUserBasedHouseData(user?.email),
  });

  //performing mutation for updating house data

  const mutation = usePerformMutation(
    "addHouse",
    // addHouseData,
    "Added successfully!"
  );

  const onSubmit = async (data) => {
    const dateValidity = dateComparer(today, data.deadline);

    if (dateValidity === "invalid") {
      showAlertOnError("Please enter a valid date!");
    } else {
      if (user.email) {
        const survey = {
          title: data.title,
          description: data.description,
          category: data.category,
          deadline: data.deadline,
          status: "unpublished",
          email: user?.email,
        };

        mutation.mutate(survey);
        refetch();
        reset();
      } else return;
    }
  };

  //performing mutation for updating house data
  const mutation1 = usePerformMutation(
    "updateHouse",
    // updateHouseData,
    "Updated successfully!"
  );

  //update button handler
  const handleUpdateHouse = (e) => {
    e.preventDefault();

    const form = e.target;
    const _id = form._id.value || "Not Found";
    const defaultDeadline = form.hiddenDeadline.value || "Not Found";
    const title = form.title.value || "Not Found";
    const description = form.description.value || "Not Found";
    const category = form.category.value || "Not Found";
    const deadline = form.deadline.value || "Not Found";

    const dateValidity = dateComparer(today, deadline);

    if (defaultDeadline !== deadline && dateValidity === "invalid") {
      showAlertOnError("Please enter a valid date!");
    } else {
      const updatedHouse = {
        title,
        description,
        category,
        deadline,
      };

      mutation1.mutate({ _id, updatedHouse });
      refetch();
      form.reset();
    }
  };

  //performing mutation for deleting house data
  const mutation2 = usePerformMutation(
    "deleteHouse",
    // deleteHouseData,
    "Deleted successfully!"
  );

  //delete button handler
  const handleDelete = (_id) => {
    mutation2.mutate({ _id });
    refetch();
  };

  if (isLoading || loading) {
    return <Loading />;
  }

  if (houses.length > 0) {
    return (
      <DashboardContainer>
        <Helmet>
          <title>House Hunter | Dashboard | Houses</title>
        </Helmet>

        <Title title={title}></Title>

        <div className="w-[90%] overflow-y-auto h-[400px] rounded-lg">
          <button
            className="btn mb-3"
            onClick={() => document.getElementById("add-house").showModal()}
          >
            Add New House
          </button>

          <dialog id={"add-house"} className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="p-5">
                <form
                  className="w-full flex flex-col gap-4 text-left"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="relative">
                    <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                      <i className="fa-solid fa-t text-xl text-white"></i>
                    </div>
                    <input
                      type="text"
                      {...register("title")}
                      placeholder="Title"
                      required
                      className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                    />
                  </div>

                  <div className="relative">
                    <div className="h-20 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                      <MdDescription className="text-2xl text-white" />
                    </div>
                    <textarea
                      type="email"
                      {...register("description")}
                      placeholder="Description"
                      required
                      className="input bg-[#a1dada41] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                    />
                  </div>

                  <div className="relative">
                    <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                      <i className="fa-solid fa-d text-xl text-white"></i>
                    </div>
                    <select
                      type="text"
                      {...register("category")}
                      placeholder="Category"
                      required
                      className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                    >
                      {categories.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#95D0D4] rounded-lg">
                      <i className="fa-regular fa-calendar-days text-xl text-white"></i>
                    </div>
                    <input
                      type="date"
                      id="in4"
                      {...register("deadline")}
                      placeholder="Deadline"
                      required
                      className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                    />
                  </div>

                  <input
                    type="submit"
                    value="Create"
                    className="btn w-1/2 mx-auto bg-[#FE7E51] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
                  />
                </form>
              </div>
            </div>
          </dialog>

          <table className="w-full table table-zebra rounded-lg text-base text-center">
            {/* head */}
            <thead className=" bg-[#FF0F48] text-base text-white font-normal text-center">
              <tr>
                <th>name</th>
                <th>picture</th>
                <th>details</th>
                <th>address</th>
                <th>rent/month</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row  */}
              {houses.map((house) => (
                <tr key={house._id}>
                  <th className="text-[#FF0F48] text-left">
                    {house.house_name}
                  </th>

                  <td>{house.picture}</td>

                  <td>
                    <button
                      className="btn btn-circle hover:bg-[#FF0F48] group"
                      onClick={() =>
                        document.getElementById(house._id).showModal()
                      }
                    >
                      <i className="fa-solid fa-circle-info group-hover:text-white"></i>
                    </button>

                    <dialog id={house._id} className="modal">
                      <div className="modal-box text-left">
                        <h3 className="font-bold text-lg">
                          {house.house_name}
                        </h3>

                        <p className="py-4">{house.description}</p>
                        <p className="py-4">Bedrooms: {house.num_bedrooms}</p>
                        <p className="py-4">Washrooms: {house.num_bathrooms}</p>
                        <p className="py-4">Room Size: {house.room_size}</p>
                        <p className="py-4">
                          Available On:
                          {timeStampToDateConverter(
                            parseInt(house.availability_date)
                          )}
                        </p>

                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>

                  <td>
                    {house.address}, {house.city}
                  </td>

                  <td>{house.rent_per_month} /-</td>

                  <td className="flex justify-center gap-3">
                    <button
                      className="btn hover:bg-emerald-500 group"
                      onClick={() =>
                        document.getElementById("u" + house._id).showModal()
                      }
                    >
                      <i className="fa-solid fa-pen-to-square group-hover:text-white"></i>
                    </button>

                    <dialog id={"u" + house._id} className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <div className="p-5">
                          <form
                            className="w-full flex flex-col gap-4 text-left"
                            onSubmit={handleUpdateHouse}
                          >
                            <input
                              type="text"
                              name="_id"
                              required
                              hidden
                              defaultValue={house._id}
                            />

                            <input
                              type="text"
                              name="hiddenDeadline"
                              required
                              hidden
                              defaultValue={house.deadline}
                            />

                            <input
                              type="text"
                              name="status"
                              required
                              hidden
                              defaultValue={house.status}
                            />

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                required
                                defaultValue={house.title}
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <div className="relative">
                              <div className="h-20 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <textarea
                                type="email"
                                name="description"
                                placeholder="Description"
                                required
                                defaultValue={house.description}
                                className="input bg-[#a1dada41] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-solid fa-envelope text-xl text-white"></i>
                              </div>
                              <select
                                type="text"
                                name="category"
                                placeholder="Category"
                                required
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              >
                                {categories.map((category) => (
                                  <option key={category}>{category}</option>
                                ))}
                              </select>
                            </div>

                            <div className="relative">
                              <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#7DDDD9] rounded-lg">
                                <i className="fa-regular fa-calendar-days text-xl text-white"></i>
                              </div>
                              <input
                                type="date"
                                id="in4"
                                name="deadline"
                                placeholder="Deadline"
                                required
                                defaultValue={house.deadline}
                                className="input bg-[#a1dada41] w-full pl-16 rounded-lg border focus:border-[#7DDDD9] focus:outline-none"
                              />
                            </div>

                            <input
                              type="submit"
                              value="Update"
                              className="btn w-1/2 mx-auto bg-[#101322] text-lg font-medium text-white hover:text-[#323484] normal-case rounded-lg"
                            />
                          </form>
                        </div>
                      </div>
                    </dialog>

                    <button
                      className="btn hover:bg-red-500 group"
                      onClick={() => handleDelete(house._id)}
                    >
                      <i className="fa-solid fa-trash group-hover:text-white "></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardContainer>
    );
  } else {
    <NoData text={"No Survey Found"}></NoData>;
  }
};

export default DisplayHouses;
