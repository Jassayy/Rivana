"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Loader, Copy, RefreshCw } from "lucide-react";

type ContentItem = {
     id: number;
     prompt: string;
     content: string;
     created_at: string;
};

async function fetchUserContents() {
     try {
          const response = await fetch("/api/user-contents");
          if (!response.ok) {
               throw new Error("Failed to fetch contents");
          }
          return await response.json();
     } catch (error) {
          console.error("Error fetching contents:", error);
          throw error;
     }
}

export default function GeneratedContentHistory() {
     const { isLoaded, isSignedIn } = useAuth();
     const [contentItems, setContentItems] = useState<ContentItem[]>([]);
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState("");
     const [copiedId, setCopiedId] = useState<number | null>(null);

     // Load content items when component mounts or user signs in
     useEffect(() => {
          if (isSignedIn) {
               loadContents();
          }
     }, [isSignedIn]);

     const loadContents = async () => {
          if (!isSignedIn) return;

          setIsLoading(true);
          setError("");

          try {
               const data = await fetchUserContents();
               setContentItems(data);
          } catch (err) {
               setError("Failed to load your content history");
               console.error(err);
          } finally {
               setIsLoading(false);
          }
     };

     const handleCopy = (content: string, id: number) => {
          navigator.clipboard.writeText(content);
          setCopiedId(id);
          setTimeout(() => setCopiedId(null), 2000);
     };

     if (!isLoaded) {
          return (
               <div className="text-center py-8">Loading authentication...</div>
          );
     }

     if (!isSignedIn) {
          return (
               <div className="text-center py-8 bg-yellow-50 border border-yellow-200 rounded-lg">
                    Please sign in to view your content history.
               </div>
          );
     }

     return (
          <div className="bg-white rounded-lg shadow-md p-6">
               <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-950">
                         Your Content History
                    </h2>
                    <Button
                         onClick={loadContents}
                         variant="outline"
                         className="flex items-center gap-2"
                         disabled={isLoading}
                    >
                         {isLoading ? (
                              <Loader className="h-4 w-4 animate-spin" />
                         ) : (
                              <RefreshCw className="h-4 w-4" />
                         )}
                         Refresh
                    </Button>
               </div>

               {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                         {error}
                    </div>
               )}

               {isLoading ? (
                    <div className="flex justify-center py-12">
                         <Loader className="h-8 w-8 animate-spin      " />
                    </div>
               ) : contentItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                         No content history found. Generate some content to see
                         it here!
                    </div>
               ) : (
                    <div className="space-y-6">
                         {contentItems.map((item) => (
                              <div
                                   key={item.id}
                                   className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                              >
                                   <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-gray-900">
                                             Prompt:
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                             {new Date(
                                                  item.created_at
                                             ).toLocaleString()}
                                        </span>
                                   </div>
                                   <p className="text-gray-700 mb-4">
                                        {item.prompt}
                                   </p>

                                   <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium text-gray-900">
                                             Generated content:
                                        </h3>
                                        <Button
                                             onClick={() =>
                                                  handleCopy(
                                                       item.content,
                                                       item.id
                                                  )
                                             }
                                             variant="ghost"
                                             size="sm"
                                             className="flex items-center gap-1"
                                        >
                                             <Copy className="h-3 w-3" />
                                             {copiedId === item.id
                                                  ? "Copied!"
                                                  : "Copy"}
                                        </Button>
                                   </div>
                                   <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 whitespace-pre-wrap">
                                        {item.content.length > 300
                                             ? `${item.content.substring(
                                                    0,
                                                    300
                                               )}...`
                                             : item.content}
                                   </div>
                              </div>
                         ))}
                    </div>
               )}
          </div>
     );
}
