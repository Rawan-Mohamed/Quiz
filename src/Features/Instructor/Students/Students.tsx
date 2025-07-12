import { PlusCircleIcon } from "@heroicons/react/solid";
import GroupTabs from "../../../Shared/Tabs/GroupTabs";
import CustomModal from "../../../Shared/CustomModal/CustomModal";
import { useState } from "react";
import { InputField, FormContainer, FormSection, FormIcons } from "../../../Shared/CustomComponents/FormComponents/FormComponents";

interface StudentFormData {
  name: string;
  phone: string;
}

const Students: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Partial<StudentFormData>>({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', phone: '' });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Student name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleButtonClick = () => {
    if (validateForm()) {
      console.log("Student data:", formData);
      // Handle the student creation logic here
      handleCloseModal();
    }
  };

  return (
    <div className="w-full p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Students Management
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                Manage your students and their information
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Add Student
            </button>
          </div>
        </div>

        <div className="p-6">
          <GroupTabs />
        </div>

        {/* Enhanced Modal */}
        <CustomModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onButtonClick={handleButtonClick}
          buttonLabel="Add Student"
          width="100%"
          height="auto"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Add New Student
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Enter the student's information to add them to your class
              </p>
            </div>

            <FormContainer>
              <FormSection>
                <InputField
                  label="Student Name"
                  name="name"
                  placeholder="Enter student's full name"
                  icon={FormIcons.user}
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  autoComplete="name"
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  icon={FormIcons.phone}
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  autoComplete="tel"
                />
              </FormSection>
            </FormContainer>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default Students;
