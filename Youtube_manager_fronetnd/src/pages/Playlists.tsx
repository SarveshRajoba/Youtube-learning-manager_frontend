import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { 
  Plus, 
  Search, 
  PlayCircle, 
  Clock, 
  Filter,
  ExternalLink,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const playlists = [
  {
    id: 1,
    title: "React Masterclass 2024",
    description: "Complete guide to modern React development with hooks, context, and performance optimization",
    videosCount: 25,
    completedCount: 18,
    totalDuration: "8h 45m",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    author: "Tech Academy",
    category: "Frontend",
    difficulty: "Intermediate",
    lastWatched: "2 hours ago"
  },
  {
    id: 2,
    title: "Node.js Complete Guide",
    description: "Backend development with Node.js, Express, and MongoDB from beginner to advanced",
    videosCount: 32,
    completedCount: 12,
    totalDuration: "12h 30m",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
    author: "Backend Masters",
    category: "Backend",
    difficulty: "Beginner",
    lastWatched: "1 day ago"
  },
  {
    id: 3,
    title: "TypeScript Deep Dive",
    description: "Advanced TypeScript concepts, patterns, and best practices for large applications",
    videosCount: 18,
    completedCount: 6,
    totalDuration: "6h 15m",
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
    author: "Code Expert",
    category: "Programming",
    difficulty: "Advanced",
    lastWatched: "3 days ago"
  },
  {
    id: 4,
    title: "Python for Data Science",
    description: "Learn Python programming for data analysis, visualization, and machine learning",
    videosCount: 28,
    completedCount: 0,
    totalDuration: "15h 20m",
    thumbnail: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=225&fit=crop",
    author: "Data Science Pro",
    category: "Data Science",
    difficulty: "Beginner",
    lastWatched: null
  }
];

const Playlists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "Frontend", "Backend", "Programming", "Data Science"];

  const filteredPlaylists = playlists.filter(playlist => {
    const matchesSearch = playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         playlist.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || playlist.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-warning text-warning-foreground";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Learning Playlists</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track your video learning playlists
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Import from YouTube
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search playlists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaylists.map((playlist) => (
            <Card key={playlist.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
              <div className="relative">
                <img 
                  src={playlist.thumbnail} 
                  alt={playlist.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8 bg-black/50 hover:bg-black/70 border-0">
                        <MoreVertical className="h-4 w-4 text-white" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on YouTube
                      </DropdownMenuItem>
                      <DropdownMenuItem>Remove from Library</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge className={getDifficultyColor(playlist.difficulty)}>
                    {playlist.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    <Link to={`/playlists/${playlist.id}`}>
                      {playlist.title}
                    </Link>
                  </CardTitle>
                </div>
                <CardDescription className="text-sm line-clamp-2">
                  {playlist.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="text-muted-foreground">
                        {playlist.completedCount}/{playlist.videosCount} videos
                      </span>
                    </div>
                    <Progress 
                      value={(playlist.completedCount / playlist.videosCount) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  {/* Meta info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <PlayCircle className="h-4 w-4" />
                        {playlist.videosCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {playlist.totalDuration}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {playlist.category}
                    </Badge>
                  </div>
                  
                  {/* Author and last watched */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">by {playlist.author}</span>
                    {playlist.lastWatched && (
                      <span className="text-primary text-xs">{playlist.lastWatched}</span>
                    )}
                  </div>
                  
                  {/* Action button */}
                  <Button asChild className="w-full mt-4">
                    <Link to={`/playlists/${playlist.id}`}>
                      {playlist.completedCount > 0 ? "Continue Learning" : "Start Learning"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlaylists.length === 0 && (
          <div className="text-center py-12">
            <PlayCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No playlists found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Start by importing your first playlist from YouTube"}
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Import from YouTube
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlists;