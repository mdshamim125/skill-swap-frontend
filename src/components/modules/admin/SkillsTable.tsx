"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getSkills } from "@/services/admin/skillsManagement";

interface Skill {
  id: string;
  title: string;
  category: string;
}

interface SkillsResponse {
  data: Skill[];
  meta: { page: number; limit: number; total: number };
  success?: boolean;
  message?: string;
}

export default function SkillsTable() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    // Wrap the async function inside the effect
    const fetchData = async () => {
      setLoading(true);
      try {
        const res: SkillsResponse = await getSkills(page, limit);
        setSkills(res.data || []);
        setTotal(res.meta?.total || 0);
      } catch (err) {
        console.error(err);
        setSkills([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]); // depends on page or limit

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mt-6 border rounded-xl p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">All Skills</h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {skills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6">
                    No skills found
                  </TableCell>
                </TableRow>
              ) : (
                skills.map((skill, index) => (
                  <TableRow key={skill.id}>
                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell className="font-medium">{skill.title}</TableCell>
                    <TableCell>{skill.category}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <span className="flex items-center">
              Page {page} of {totalPages || 1}
            </span>

            <Button
              variant="outline"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { getSkills } from "@/services/admin/skillsManagement";

// interface Skill {
//   id: string;
//   title: string;
//   category: string;
// }

// export default function SkillsTable() {
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   useEffect(() => {
//     getSkills(page, limit).then((res) => {
//       setSkills(res.data);
//       setLoading(false);
//     });
//   }, [page, limit]);

//   return (
//     <div className="mt-6 border rounded-xl p-4 bg-white shadow-sm">
//       <h2 className="text-lg font-semibold mb-4">All Skills</h2>

//       {/* Loading State */}
//       {loading ? (
//         <div className="flex justify-center py-10">
//           <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
//         </div>
//       ) : (
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]">#</TableHead>
//               <TableHead>Title</TableHead>
//               <TableHead>Category</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {skills.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={3} className="text-center py-6">
//                   No skills found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               skills.map((skill, index) => (
//                 <TableRow key={skill.id}>
//                   <TableCell>{(page - 1) * limit + index + 1}</TableCell>
//                   <TableCell className="font-medium">{skill.title}</TableCell>
//                   <TableCell>{skill.category}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       )}

//       {/* Pagination */}
//       <div className="flex justify-between mt-4">
//         <Button
//           variant="outline"
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//         >
//           Previous
//         </Button>

//         <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }
