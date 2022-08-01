import { useContext } from "react";
import { InlineWidget } from "react-calendly";
import axios from "axios";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import {PersonalDetailsContext} from '../../shared/utils/contexts'

export default function Connect() {
  const [contactname, setcontactname] = useState("");
  const [contactemail, setcontactemail] = useState("");
  const [contactphone, setcontactphone] = useState("");
  const [contactmessage, setcontactmessage] = useState("");

  const {socialMedia } = useContext(PersonalDetailsContext);

  async function createContactHandler() {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/graphql`,
        {
          operationName: "CreateContact",
          query:
            "mutation CreateContact($contact: ContactInput) { createContact(contact: $contact) {id name email phone message}}",
          variables: {
            contact: {
              name: contactname,
              email: contactemail,
              phone: parseInt(contactphone),
              message: contactmessage,
            },
          },
        }
      );
      if (response.data) {
        alert("Message sended successfully!");
        setcontactname("");
        setcontactemail("");
        setcontactmessage("");
        setcontactphone("");
      }
    } catch (err) {
      return false;
    }
  }

  return (
    <>
      <div className="bg-blue pt-20 h-auto min-h-screen">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="w-full text-center lg:w-7/12 lg:text-left pl-0 lg:pl-20">
            <div className="w-full lg:w-2/3">
              <h1 className="text-3xl sm:text-2xl xl:text-1xl font-extrabold text-white leading-none mb-6">
                Lets talk...{" "}
              </h1>{" "}
              <p className="text-sm sm:text-7xl font-light text-white leading-none mb-6">
                Hate forms? Send us an email instead or Schedule a 30 minutes
                call with me via Google meet.{" "}
              </p>{" "}
              <div className="flex flex-row justify-center lg:justify-start items-end">
                {socialMedia.map(({ alt_text, image_file, link }) => {
                  return (
                    <a href={link} key={link}>
                      <img
                        src={image_file}
                        alt={alt_text}
                        className="w-6 md:w-10 h-10 m-2 md:m-2 transition-all hover:opacity-40 transform hover:scale-75"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="ml-auto w-full px-4 lg:mr-20 lg:w-5/12 h-auto align-items: center; mt-10 lg:mt-15 ">
            <>
              <Tab.Group>
                <Tab.List
                  className={
                    "mb-5 text-md font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
                  }
                >
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          !selected
                            ? "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            : "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                        }
                      >
                        Form
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={
                          !selected
                            ? "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            : "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                        }
                      >
                        Google Meet
                      </button>
                    )}
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <div className="w-full md:w-96 md:max-w-full mx-auto">
                      <div className="p-6 border border-gray-300 sm:rounded-md bg-white">
                        {/* <form method="POST" action="https://herotofu.com/start"> */}
                          <label className="block mb-6">
                            <span className="text-gray-700">Your name</span>
                            <div className="flex items-center border-b border-teal-500 pt-3">
                              <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                value={contactname}
                                placeholder="Enter Your Name"
                                aria-label="Full name"
                                onChange={(e) => setcontactname(e.target.value)}
                              />
                              <button
                                className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                                onClick={() => setcontactname("")}
                                type="button"
                              >
                                clear
                              </button>
                            </div>
                          </label>
                          <label className="block mb-6">
                            <span className="text-gray-700">Email address</span>
                            <div className="flex items-center border-b border-teal-500 pt-3">
                              <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="email"
                                placeholder="company@gmail.com"
                                aria-label="Email"
                                onChange={(e) =>
                                  setcontactemail(e.target.value)
                                }
                                value={contactemail}
                              />
                              <button
                                className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                                onClick={() => setcontactemail("")}
                                type="button"
                              >
                                clear
                              </button>
                            </div>
                          </label>

                          <label className="block mb-6">
                            <span className="text-gray-700">Phone Number</span>
                            <div className="flex items-center border-b border-teal-500 pt-3">
                              <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="tel"
                                placeholder="XXXXXXXXXX"
                                aria-label="phone"
                                onChange={(e) =>
                                  setcontactphone(e.target.value)
                                }
                                value={contactphone}
                              />
                              <button
                                className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                                onClick={() => setcontactphone("")}
                                type="button"
                              >
                                clear
                              </button>
                            </div>
                          </label>
                          <label className="block mb-6">
                            <span className="text-gray-700">Message</span>
                            <div className="flex items-center border-b border-teal-500 pt-3">
                              <textarea
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Write your message here..."
                                aria-label="Message"
                                value={contactmessage}
                                onChange={(e) =>
                                  setcontactmessage(e.target.value)
                                }
                                // rows={3}
                              />

                              <button
                                className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
                                onClick={() => setcontactmessage("")}
                                type="button"
                              >
                                clear
                              </button>
                            </div>
                          </label>
                          <div className="md:flex md:items-center">
                            <div className="md:w-1/3" />
                            <div className="md:w-2/3">
                              <button
                                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-md border-4 text-white py-1 px-8 rounded-full"
                                onClick={createContactHandler}
                                type="button"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        {/* </form> */}
                      </div>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    {" "}
                    <InlineWidget
                      styles={{ height: "550px", width: "80%", margin: "auto" }}
                      pageSettings={{
                        textColor: "#B8C1EC",
                        primaryColor: "#B8C1EC",
                      }}
                      url={"https://calendly.com/manishsuthar"}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
  
