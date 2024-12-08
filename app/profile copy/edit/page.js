"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function EditProfilePage() {
  const supabase = createClientComponentClient();
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [location, setLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [academicRole, setAcademicRole] = useState("");
  const [fieldOfExpertise, setFieldOfExpertise] = useState("");
  const [otherFieldOfExpertise, setOtherFieldOfExpertise] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [headline, setHeadline] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          setFirstName(profile.first_name || "");
          setLastName(profile.last_name || "");
          setUsername(profile.username || "");
          setEmail(profile.email || "");
          setHeadline(profile.headline || "");
          setLocation(profile.location || "");
          setAcademicRole(profile.academic_role || "");
          setFieldOfExpertise(profile.field_of_expertise || "");
          setOtherFieldOfExpertise(profile.other_field_of_expertise || "");
          setInstitution(profile.institution || "");
          setDepartment(profile.department || "");
          if (profile.avatar_url) {
            const { data: avatarUrl } = supabase.storage
              .from("avatars")
              .getPublicUrl(profile.avatar_url);
            setProfileImagePreview(avatarUrl.publicUrl);
          }
          if (profile.cover_image_url) {
            const { data: coverUrl } = supabase.storage
              .from("covers")
              .getPublicUrl(profile.cover_image_url);
            setCoverImagePreview(coverUrl.publicUrl);
          }
        }
      }
    };

    fetchUserProfile();
  }, [supabase]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPEG and PNG files are allowed");
        return;
      }

      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    const fileInput = document.getElementById("profile-image-input");
    if (fileInput) fileInput.value = "";
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPEG and PNG files are allowed");
        return;
      }

      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
    const fileInput = document.getElementById("cover-image-input");
    if (fileInput) fileInput.value = "";
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 2) {
      const mockSuggestions = [
        "San Francisco, California, USA",
        "San Jose, California, USA",
        "San Diego, California, USA",
        "San Antonio, Texas, USA",
      ].filter((loc) => loc.toLowerCase().includes(value.toLowerCase()));

      setLocationSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const name = `${firstName} ${lastName}`.trim();
      if (!name) throw new Error("Name is required");

      let avatar_url = null;
      if (profileImage) {
        const filePath = `${user.id}/${Date.now()}-avatar`;
        const { error: avatarError } = await supabase.storage
          .from("avatars")
          .upload(filePath, profileImage);

        if (avatarError) throw avatarError;
        avatar_url = filePath; // Store only the path
      }

      let cover_image_url = null;
      if (coverImage) {
        const filePath = `${user.id}/${Date.now()}-cover`;
        const { error: coverError } = await supabase.storage
          .from("covers")
          .upload(filePath, coverImage);

        if (coverError) throw coverError;
        cover_image_url = filePath; // Store only the path
      }

      const { error: updateError } = await supabase.from("users").upsert({
        id: user.id,
        name,
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        headline,
        location,
        academic_role: academicRole,
        field_of_expertise: fieldOfExpertise,
        other_field_of_expertise: otherFieldOfExpertise,
        institution,
        department,
        ...(avatar_url && { avatar_url }),
        ...(cover_image_url && { cover_image_url }),
        updated_at: new Date().toISOString(),
      });

      if (updateError) throw updateError;

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 max-w-5xl mx-auto">
      <div className="p-4">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/profile" className="text-xl hover:text-gray-300">
            ←
          </Link>
          <h1 className="text-xl font-bold">Edit Profile</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Cover Image
              </label>
              <div className="relative h-32 bg-gray-800 rounded-xl overflow-hidden">
                {coverImagePreview ? (
                  <>
                    <Image
                      src={coverImagePreview}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="space-x-2 pb-2">
                        <label className="px-4 py-2 rounded-full border border-gray-600 bg-black/50 hover:bg-black/70 cursor-pointer">
                          Change Image
                          <input
                            type="file"
                            id="cover-image-input"
                            className="hidden"
                            accept="image/jpeg,image/png"
                            onChange={handleCoverImageChange}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={removeCoverImage}
                          className="px-4 py-2 rounded-full border border-red-600 text-red-500 bg-black/50 hover:bg-black/70"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <label className="px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-700 cursor-pointer">
                      Upload Image
                      <input
                        type="file"
                        id="cover-image-input"
                        className="hidden"
                        accept="image/jpeg,image/png"
                        onChange={handleCoverImageChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Profile Picture
              </label>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24">
                    {profileImagePreview ? (
                      <>
                        <Image
                          src={profileImagePreview}
                          alt="Profile preview"
                          fill
                          className="rounded-full object-cover"
                        />
                        <div className="absolute -right-[250px] top-1/2 -translate-y-1/2 flex items-center">
                          <div className="space-x-2">
                            <label className="px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-800 cursor-pointer">
                              Change Image
                              <input
                                type="file"
                                id="profile-image-input"
                                className="hidden"
                                accept="image/jpeg,image/png"
                                onChange={handleProfileImageChange}
                              />
                            </label>
                            <button
                              type="button"
                              onClick={removeProfileImage}
                              className="px-4 py-2 rounded-full border border-red-600 text-red-500 hover:bg-red-950"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {!profileImagePreview && (
                    <div className="space-y-2">
                      <label className="px-4 py-2 rounded-full border border-gray-600 hover:bg-gray-800 cursor-pointer">
                        Upload Image
                        <input
                          type="file"
                          id="profile-image-input"
                          className="hidden"
                          accept="image/jpeg,image/png"
                          onChange={handleProfileImageChange}
                        />
                      </label>

                      <div className="text-sm text-gray-400">
                        <p>Max size: 5MB</p>
                        <p>Formats: JPEG, PNG</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-gray-800 rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-gray-800 rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-gray-800 rounded-lg p-3 pl-6 border border-gray-700 focus:border-blue-500 focus:outline-none"
                      placeholder="Choose a username"
                    />
                    <span className="text-xs text-gray-400 mt-1 block">
                      Username can contain letters, numbers, and underscores
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    className="w-full bg-gray-800 rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none cursor-not-allowed opacity-75"
                    disabled
                  />
                  <span className="text-xs text-gray-400 mt-1 block">
                    Email address cannot be changed
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Headline
                    <span className="text-gray-400 text-xs ml-2">
                      (Maximum 160 characters)
                    </span>
                  </label>
                  <textarea
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-gray-800 rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                    rows={2}
                    maxLength={160}
                    placeholder="A brief description about yourself (e.g., Senior Software Engineer | AI Enthusiast | Tech Writer)"
                  />
                  <span className="text-xs text-gray-400 mt-1 block">
                    This appears below your name on your profile
                  </span>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                    onFocus={() =>
                      location.length > 2 && setShowSuggestions(true)
                    }
                    className="w-full bg-gray-800 rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your location"
                  />

                  {showSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                      {locationSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSelectLocation(suggestion)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-xs text-gray-400 mt-1 block">
                    Enter city name to see suggestions
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">University</h3>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Academic Role
                </label>
                <select
                  value={academicRole}
                  onChange={(e) => setAcademicRole(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select your role</option>
                  <option value="professor">Professor</option>
                  <option value="assistant_professor">
                    Assistant Professor
                  </option>
                  <option value="associate_professor">
                    Associate Professor
                  </option>
                  <option value="lecturer">Lecturer</option>
                  <option value="adjunct_professor">Adjunct Professor</option>
                  <option value="postdoctoral_researcher">
                    Postdoctoral Researcher
                  </option>
                  <option value="phd_candidate">PhD Candidate</option>
                  <option value="graduate_student">Graduate Student</option>
                  <option value="undergraduate_student">
                    Undergraduate Student
                  </option>
                  <option value="research_assistant">Research Assistant</option>
                  <option value="teaching_assistant">Teaching Assistant</option>
                  <option value="visiting_scholar">Visiting Scholar</option>
                  <option value="fellow">Fellow</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Field of Expertise
                </label>
                <select
                  value={fieldOfExpertise}
                  onChange={(e) => setFieldOfExpertise(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select your field</option>
                  <option value="computer_science">Computer Science</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="engineering">Engineering</option>
                  <option value="biology">Biology</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="social_sciences">Social Sciences</option>
                  <option value="humanities">Humanities</option>
                  <option value="other">Other</option>
                </select>

                {fieldOfExpertise === "other" && (
                  <input
                    type="text"
                    value={otherFieldOfExpertise}
                    onChange={(e) => setOtherFieldOfExpertise(e.target.value)}
                    placeholder="Please specify your field"
                    className="w-full mt-2 bg-gray-800 rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Affiliated Institution
                  <span className="text-gray-400 text-xs ml-2">
                    (e.g., Stanford University, Harvard University)
                  </span>
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your institution"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Department
                  <span className="text-gray-400 text-xs ml-2">
                    (e.g., Computer Science Department, Physics Department)
                  </span>
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg p-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your department"
                />
              </div>
            </div>
          </div>

          {showSuccess && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-500">
                Your profile has been updated successfully!
              </span>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Link
              href="/profile"
              className="px-8 py-3 border border-gray-600 hover:bg-gray-800 rounded-full font-semibold transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full font-semibold transition-colors flex items-center gap-2
                ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
