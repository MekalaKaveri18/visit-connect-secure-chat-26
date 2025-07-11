
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Search, UserX, Plus, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const Blacklist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blacklistedUsers] = useState([
    {
      id: 1,
      name: "Michael Johnson",
      email: "michael.j@email.com",
      reason: "Security breach attempt",
      dateAdded: "2024-03-10",
      addedBy: "Admin",
    },
    {
      id: 2,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      reason: "Inappropriate behavior",
      dateAdded: "2024-03-08",
      addedBy: "Security Team",
    },
    {
      id: 3,
      name: "Anonymous User",
      email: "unknown@temp.com",
      reason: "Suspicious activity",
      dateAdded: "2024-03-05",
      addedBy: "System",
    },
  ]);

  const filteredUsers = blacklistedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <Chatbot />
      
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Security Blacklist
          </h1>
          <p className="text-xl text-gray-600">
            Manage restricted visitors and maintain security protocols
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blacklisted</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{blacklistedUsers.length}</div>
              <p className="text-xs text-muted-foreground">Active restrictions</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">New additions</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Level</CardTitle>
              <AlertTriangle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Add */}
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>Manage Blacklist</CardTitle>
            <CardDescription>Search, add, or remove users from the security blacklist</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Add to Blacklist
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blacklist Table */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserX className="h-5 w-5 text-red-600" />
              <span>Blacklisted Visitors</span>
            </CardTitle>
            <CardDescription>
              {filteredUsers.length} of {blacklistedUsers.length} users shown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <Badge variant="destructive" className="bg-red-100 text-red-800">
                        Blacklisted
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Reason: </span>
                        <span className="text-gray-600">{user.reason}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Date Added: </span>
                        <span className="text-gray-600">{user.dateAdded}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Added By: </span>
                        <span className="text-gray-600">{user.addedBy}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <UserX className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No blacklisted users found matching your search.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blacklist;
