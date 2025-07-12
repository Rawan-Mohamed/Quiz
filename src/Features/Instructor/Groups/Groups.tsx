import { PlusCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../../Shared/CustomModal/CustomModal";
import { fetchStudents } from "../../../Redux/Features/Instructor/Students/GetAllStudentsSlice";
import { addGroup } from "../../../Redux/Features/Instructor/Groups/AddGroupSlice";
import { updateGroup } from "../../../Redux/Features/Instructor/Groups/UpdateGroupeSlice";
import { deleteGroup } from "../../../Redux/Features/Instructor/Groups/DeleteGroupSlice";
import groupsImg from "../../../assets/images/groups.png";
import { 
  InputField, 
  SelectField, 
  FormContainer, 
  FormSection,
  FormIcons 
} from "../../../Shared/CustomComponents/FormComponents/FormComponents";

interface GroupFormData {
  groupName: string;
  students: string[];
}

interface UpdateGroupFormData {
  updatedGroupName: string;
  updatedStudents: string[];
}

const Groups: React.FC = () => {
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [formData, setFormData] = useState<GroupFormData>({
    groupName: '',
    students: []
  });
  const [updateFormData, setUpdateFormData] = useState<UpdateGroupFormData>({
    updatedGroupName: '',
    updatedStudents: []
  });
  const [errors, setErrors] = useState<Partial<GroupFormData>>({});
  const [updateErrors, setUpdateErrors] = useState<Partial<UpdateGroupFormData>>({});

  const { register, handleSubmit, formState: { errors: formErrors }, getValues, setValue, reset } = useForm();

  const { data: groups } = useSelector((state: any) => state.groupsSlice) || {};
  const { data: students } = useSelector((state: any) => state.studentsData) || {};

  useEffect(() => {
    dispatch(fetchStudents() as any);
  }, [dispatch]);

  const openUpdateModal = (group: any) => {
    setSelectedGroup(group);
    setUpdateFormData({
      updatedGroupName: group.name,
      updatedStudents: group.students?.map((s: any) => s._id) || []
    });
    setIsUpdateModalOpen(true);
  };

  const handleAddGroup = async (data: GroupFormData) => {
    try {
      await dispatch(addGroup({ name: data.groupName, students: data.students }) as any);
      setIsAddModalOpen(false);
      setFormData({ groupName: '', students: [] });
      setErrors({});
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };

  const handleUpdateGroup = async (data: UpdateGroupFormData) => {
    if (!selectedGroup) return;
    
    try {
      await dispatch(updateGroup({ 
        groupId: selectedGroup._id, 
        groupData: { 
          name: data.updatedGroupName, 
          students: data.updatedStudents 
        } 
      }) as any);
      setIsUpdateModalOpen(false);
      setSelectedGroup(null);
      setUpdateFormData({ updatedGroupName: '', updatedStudents: [] });
      setUpdateErrors({});
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const openDeleteModal = (groupId: string) => {
    setSelectedGroup({ _id: groupId });
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedGroup(null);
    setFormData({ groupName: '', students: [] });
    setUpdateFormData({ updatedGroupName: '', updatedStudents: [] });
    setErrors({});
    setUpdateErrors({});
  };

  const handleDeleteGroup = () => {
    if (selectedGroup) {
      dispatch(deleteGroup({ id: selectedGroup._id }) as any);
      setIsDeleteModalOpen(false);
      setSelectedGroup(null);
    }
  };

  const validateAddForm = (): boolean => {
    const newErrors: Partial<GroupFormData> = {};

    if (!formData.groupName.trim()) {
      newErrors.groupName = "Group name is required";
    } else if (formData.groupName.trim().length < 2) {
      newErrors.groupName = "Group name must be at least 2 characters";
    }

    if (formData.students.length === 0) {
      newErrors.students = "Please select at least one student";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUpdateForm = (): boolean => {
    const newErrors: Partial<UpdateGroupFormData> = {};

    if (!updateFormData.updatedGroupName.trim()) {
      newErrors.updatedGroupName = "Group name is required";
    } else if (updateFormData.updatedGroupName.trim().length < 2) {
      newErrors.updatedGroupName = "Group name must be at least 2 characters";
    }

    if (updateFormData.updatedStudents.length === 0) {
      newErrors.updatedStudents = "Please select at least one student";
    }

    setUpdateErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddInputChange = (field: keyof GroupFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleUpdateInputChange = (field: keyof UpdateGroupFormData, value: any) => {
    setUpdateFormData(prev => ({ ...prev, [field]: value }));
    if (updateErrors[field]) {
      setUpdateErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const studentOptions = students?.map((student: any) => ({
    value: student._id,
    label: `${student.first_name} ${student.last_name || ''}`
  })) || [];

  return (
    <div className="w-full p-6">
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Groups Management
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                Create and manage student groups for your quizzes
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Add Group
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups?.map((group: any) => (
              <div
                key={group._id}
                className="bg-white dark:bg-neutral-700 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-600 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {group.name}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openUpdateModal(group)}
                        className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(group._id)}
                        className="p-2 text-neutral-600 hover:text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm font-medium">
                      {group.students?.length || 0} students
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Group Modal */}
        <CustomModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          onButtonClick={() => validateAddForm() && handleAddGroup(formData)}
          buttonLabel="Create Group"
          width="100%"
          height="auto"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Create New Group
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Set up a new group and assign students to it
              </p>
            </div>

            <FormContainer>
              <FormSection>
                <InputField
                  label="Group Name"
                  name="groupName"
                  placeholder="Enter group name"
                  icon={FormIcons.user}
                  required
                  value={formData.groupName}
                  onChange={(e) => handleAddInputChange('groupName', e.target.value)}
                  error={errors.groupName}
                />

                <SelectField
                  label="Select Students"
                  name="students"
                  options={studentOptions}
                  placeholder="Choose students for this group"
                  icon={FormIcons.user}
                  required
                  multiple
                  value={formData.students}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                    handleAddInputChange('students', selectedOptions);
                  }}
                  error={errors.students}
                />
              </FormSection>
            </FormContainer>
          </div>
        </CustomModal>

        {/* Update Group Modal */}
        <CustomModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseModal}
          onButtonClick={() => validateUpdateForm() && handleUpdateGroup(updateFormData)}
          buttonLabel="Update Group"
          width="100%"
          height="auto"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Update Group
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Modify the group name and student assignments
              </p>
            </div>

            <FormContainer>
              <FormSection>
                <InputField
                  label="Group Name"
                  name="updatedGroupName"
                  placeholder="Enter group name"
                  icon={FormIcons.user}
                  required
                  value={updateFormData.updatedGroupName}
                  onChange={(e) => handleUpdateInputChange('updatedGroupName', e.target.value)}
                  error={updateErrors.updatedGroupName}
                />

                <SelectField
                  label="Select Students"
                  name="updatedStudents"
                  options={studentOptions}
                  placeholder="Choose students for this group"
                  icon={FormIcons.user}
                  required
                  multiple
                  value={updateFormData.updatedStudents}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                    handleUpdateInputChange('updatedStudents', selectedOptions);
                  }}
                  error={updateErrors.updatedStudents}
                />
              </FormSection>
            </FormContainer>
          </div>
        </CustomModal>

        {/* Delete Group Modal */}
        <CustomModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseModal}
          onButtonClick={handleDeleteGroup}
          buttonLabel="Delete Group"
          width="100%"
          height="auto"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-error-100 dark:bg-error-900/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-error-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                Delete Group
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Are you sure you want to delete this group? This action cannot be undone.
              </p>
            </div>
          </div>
        </CustomModal>
      </div>
    </div>
  );
};

export default Groups;
