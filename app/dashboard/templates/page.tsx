"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

type Template = {
     id: number;
     name: string;
     content: string;
     created_at: string;
};

const TemplatesPage = () => {
     const [templates, setTemplates] = useState<Template[]>([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
          const fetchTemplates = async () => {
               try {
                    const response = await fetch("/api/user-templates");

                    if (!response.ok) {
                         throw new Error("Failed to fetch templates");
                    }

                    const data = await response.json();
                    setTemplates(data.templates);
               } catch (err) {
                    setError(
                         "Error loading templates. Please try again later."
                    );
                    console.error("Error fetching templates:", err);
               } finally {
                    setLoading(false);
               }
          };

          fetchTemplates();
     }, []);

     if (loading) {
          return (
               <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                         <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                         <p className="mt-2">Loading your templates...</p>
                    </div>
               </div>
          );
     }

     if (error) {
          return (
               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
               </div>
          );
     }

     return (
          <div className="container mx-auto px-4 py-8">
               <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-blue-950">
                         Your Templates
                    </h1>
               </div>

               {templates.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                         <h3 className="text-lg font-medium text-gray-600">
                              No templates yet
                         </h3>
                         <p className="mt-2 text-gray-500">
                              Create your first template to get started
                         </p>
                    </div>
               ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {templates.map((template) => (
                              <div
                                   key={template.id}
                                   className="border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                              >
                                   <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">
                                             {template.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-4">
                                             Created on{" "}
                                             {new Date(
                                                  template.created_at
                                             ).toLocaleDateString()}
                                        </p>
                                        <Button
                                             variant="outline"
                                             size="sm"
                                             asChild
                                        >
                                             <Link
                                                  href={`/dashboard/templates/${template.id}`}
                                             >
                                                  <Eye className="w-4 h-4 mr-2" />
                                                  View
                                             </Link>
                                        </Button>
                                   </div>
                              </div>
                         ))}
                    </div>
               )}
          </div>
     );
};

export default TemplatesPage;
