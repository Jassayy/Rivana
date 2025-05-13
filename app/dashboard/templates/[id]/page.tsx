"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy, ArrowLeft } from "lucide-react";

type Template = {
     id: number;
     name: string;
     content: string;
     created_at: string;
};

const TemplateViewPage = () => {
     const params = useParams();
     const router = useRouter();
     const [template, setTemplate] = useState<Template | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);
     const [copied, setCopied] = useState(false);

     const templateId = params.id as string;

     useEffect(() => {
          const fetchTemplate = async () => {
               try {
                    const response = await fetch(
                         `/api/user-templates/${templateId}`
                    );

                    if (!response.ok) {
                         throw new Error("Failed to fetch template");
                    }

                    const data = await response.json();
                    setTemplate(data.template);
               } catch (err) {
                    setError("Error loading template. Please try again later.");
                    console.error("Error fetching template:", err);
               } finally {
                    setLoading(false);
               }
          };

          if (templateId) {
               fetchTemplate();
          }
     }, [templateId]);

     const handleCopy = () => {
          if (!template) return;
          navigator.clipboard.writeText(template.content);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
     };

     if (loading) {
          return (
               <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                         <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                         <p className="mt-2">Loading template...</p>
                    </div>
               </div>
          );
     }

     if (error || !template) {
          return (
               <div className="container mx-auto px-4 py-8">
                    <Button
                         variant="outline"
                         onClick={() => router.back()}
                         className="mb-4"
                    >
                         <ArrowLeft className="w-4 h-4 mr-2" />
                         Back to Templates
                    </Button>
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                         <p>{error || "Template not found"}</p>
                    </div>
               </div>
          );
     }

     return (
          <div className="container mx-auto px-4 py-8">
               <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="mb-4"
               >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Templates
               </Button>

               <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                         <h1 className="text-xl font-bold">{template.name}</h1>
                         <Button
                              variant="outline"
                              onClick={handleCopy}
                              className="flex items-center"
                         >
                              <Copy className="w-4 h-4 mr-2" />
                              {copied ? "Copied!" : "Copy Content"}
                         </Button>
                    </div>

                    <div className="p-6">
                         <div className="text-gray-700 whitespace-pre-wrap">
                              {template.content}
                         </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 text-sm text-gray-500">
                         Created on{" "}
                         {new Date(template.created_at).toLocaleDateString()}
                    </div>
               </div>
          </div>
     );
};

export default TemplateViewPage;
