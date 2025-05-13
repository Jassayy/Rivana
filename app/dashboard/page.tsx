"use client";
import handleSubmission from "@/actions/handleformsubmission";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader, Copy, Save } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { saveAsTemplate } from "@/actions/savtemplate";

const Page = () => {
     const { isLoaded, isSignedIn } = useAuth();
     const [prompt, setPrompt] = useState("");
     const [response, setResponse] = useState("");
     const [isLoading, setIsLoading] = useState(false);
     const [copied, setCopied] = useState(false);
     const [templateName, setTemplateName] = useState("");
     const [isSaving, setIsSaving] = useState(false);
     const [saveSuccess, setSaveSuccess] = useState(false);
     const [saveError, setSaveError] = useState("");
     const [showTemplateForm, setShowTemplateForm] = useState(false);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);
          try {
               const formData = new FormData();
               formData.append("prompt", prompt);
               const result = await handleSubmission(formData);
               setResponse(result || "No response generated");
               setPrompt("");
          } catch (error) {
               setResponse(
                    `Error: ${
                         error instanceof Error
                              ? error.message
                              : "Something went wrong"
                    }`
               );
          } finally {
               setIsLoading(false);
          }
     };

     const handleCopy = () => {
          if (!response) return;
          navigator.clipboard.writeText(response);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
     };

     const handleSaveTemplate = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!response || !templateName.trim()) return;

          setIsSaving(true);
          setSaveSuccess(false);
          setSaveError("");

          try {
               const result = await saveAsTemplate(
                    templateName.trim(),
                    response
               );

               if (result.success) {
                    setSaveSuccess(true);
                    setTemplateName("");
                    setShowTemplateForm(false);
                    // Clear success message after 3 seconds
                    setTimeout(() => setSaveSuccess(false), 3000);
               } else {
                    setSaveError(result.error || "Failed to save template");
               }
          } catch (error) {
               setSaveError(
                    error instanceof Error ? error.message : "An error occurred"
               );
          } finally {
               setIsSaving(false);
          }
     };

     return (
          <div className="flex flex-col md:flex-row min-h-screen">
               {/* Left Side Div */}
               <div className="w-full md:w-1/2 p-4">
                    <h2 className="text-4xl text-center text-blue-950 font-bold mb-4 ">
                         Welcome
                    </h2>
                    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                         <p className="text-gray-700">
                              Give the prompt to the AI to generate official
                              letters, notices, emails, etc.
                         </p>

                         {!isLoaded ? (
                              <div className="mt-2 text-sm text-gray-500">
                                   Loading authentication...
                              </div>
                         ) : !isSignedIn ? (
                              <div className="mt-2 text-sm text-yellow-600">
                                   Sign in to save your generated content.
                              </div>
                         ) : (
                              <div className="mt-2 text-sm text-green-600">
                                   Your generated content will be saved
                                   automatically.
                              </div>
                         )}
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                         <Textarea
                              className="min-h-[200px]"
                              placeholder="Give a prompt to generate official letters, notices, templates etc. Be specific of the contents you need."
                              value={prompt}
                              onChange={(e) => setPrompt(e.target.value)}
                         />
                         <Button
                              type="submit"
                              className="hover:cursor-pointer mt-4 mx-56"
                              disabled={isLoading}
                         >
                              {isLoading ? (
                                   <Loader className="h-6 w-6 animate-spin" />
                              ) : (
                                   "Generate"
                              )}
                         </Button>
                    </form>
               </div>

               {/* Right Side Div */}
               <div className="w-full md:w-1/2 p-4">
                    <h2 className="text-4xl font-bold mb-4 text-center text-blue-950">
                         Preview
                    </h2>
                    <div className="bg-white p-6 rounded-lg shadow-md relative">
                         {isLoading ? (
                              <span className="flex justify-center">
                                   <Loader className="h-6 w-6 animate-spin" />
                              </span>
                         ) : response ? (
                              <>
                                   <div className="flex gap-2 absolute top-0 right-3">
                                        <Button
                                             onClick={handleCopy}
                                             variant="outline"
                                             className="mt-4 flex items-center gap-2 hover:cursor-pointer"
                                        >
                                             <Copy className="w-4 h-4" />
                                             {copied ? "Copied!" : "Copy"}
                                        </Button>

                                        {isSignedIn && !showTemplateForm && (
                                             <Button
                                                  onClick={() =>
                                                       setShowTemplateForm(true)
                                                  }
                                                  variant="outline"
                                                  className="mt-4 flex items-center gap-2 hover:cursor-pointer"
                                             >
                                                  <Save className="w-4 h-4" />
                                                  Save as Template
                                             </Button>
                                        )}
                                   </div>

                                   {showTemplateForm && isSignedIn && (
                                        <div className="mt-12 mb-4 p-3 border rounded-md">
                                             <form
                                                  onSubmit={handleSaveTemplate}
                                                  className="flex flex-col gap-2"
                                             >
                                                  <div className="text-sm font-medium">
                                                       Save as Template
                                                  </div>
                                                  <Input
                                                       placeholder="Template name"
                                                       value={templateName}
                                                       onChange={(e) =>
                                                            setTemplateName(
                                                                 e.target.value
                                                            )
                                                       }
                                                       className="text-sm"
                                                  />
                                                  <div className="flex justify-between">
                                                       <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                 setShowTemplateForm(
                                                                      false
                                                                 );
                                                                 setTemplateName(
                                                                      ""
                                                                 );
                                                                 setSaveError(
                                                                      ""
                                                                 );
                                                            }}
                                                       >
                                                            Cancel
                                                       </Button>
                                                       <Button
                                                            type="submit"
                                                            size="sm"
                                                            disabled={
                                                                 !templateName.trim() ||
                                                                 isSaving
                                                            }
                                                       >
                                                            {isSaving ? (
                                                                 <>
                                                                      <Loader className="h-3 w-3 mr-2 animate-spin" />
                                                                      Saving...
                                                                 </>
                                                            ) : (
                                                                 "Save"
                                                            )}
                                                       </Button>
                                                  </div>
                                                  {saveError && (
                                                       <div className="text-red-500 text-xs mt-1">
                                                            {saveError}
                                                       </div>
                                                  )}
                                             </form>
                                        </div>
                                   )}

                                   {saveSuccess && (
                                        <div className="mb-4 p-2 text-green-700 bg-green-50 border border-green-200 rounded-md text-sm">
                                             Template saved successfully!
                                        </div>
                                   )}

                                   <div
                                        className={`text-gray-700 whitespace-pre-wrap text-sm ${
                                             showTemplateForm || saveSuccess
                                                  ? "pt-0"
                                                  : "pt-12"
                                        }`}
                                   >
                                        {response}
                                   </div>
                              </>
                         ) : (
                              <p className="text-sm text-gray-600">
                                   Hi there! How can I help you today?
                              </p>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default Page;
