import AddSkillButton from "@/components/modules/admin/AddSkillButton";
import SkillsTable from "@/components/modules/admin/SkillsTable";

export default function SkillsManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Skills Management</h1>
        <AddSkillButton />
      </div>

      <SkillsTable />
    </div>
  );
}
