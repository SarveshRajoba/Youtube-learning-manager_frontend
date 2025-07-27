import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { 
  PlayCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Brain,
  Plus,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const stats = {
  totalVideos: 24,
  completedVideos: 18,
  totalWatchTime: "12h 30m",
  activeGoals: 3,
  weeklyProgress: 75
};

const recentActivity = [
  {
    id: 1,
    type: "completed",
    title: "React Hooks Deep Dive",
    playlist: "React Masterclass",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    type: "goal_achieved",
    title: "Complete 5 videos this week",
    timestamp: "1 day ago"
  },
  {
    id: 3,
    type: "started",
    title: "Advanced TypeScript Patterns",
    playlist: "TypeScript Pro",
    timestamp: "2 days ago"
  }
];

const recentPlaylists = [
  {
    id: 1,
    title: "React Masterclass",
    videosCount: 12,
    completedCount: 8,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Node.js Complete Guide",
    videosCount: 18,
    completedCount: 6,
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Design Patterns",
    videosCount: 8,
    completedCount: 4,
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop"
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's your learning progress overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Videos Completed</CardTitle>
              <PlayCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedVideos}/{stats.totalVideos}</div>
              <p className="text-xs text-muted-foreground">
                +3 from last week
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
              <Clock className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWatchTime}</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
              <Target className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeGoals}</div>
              <p className="text-xs text-muted-foreground">
                2 goals achieved this month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent to-accent/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.weeklyProgress}%</div>
              <Progress value={stats.weeklyProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {activity.type === "completed" && (
                          <Badge variant="default" className="bg-success text-success-foreground">
                            Completed
                          </Badge>
                        )}
                        {activity.type === "goal_achieved" && (
                          <Badge variant="default" className="bg-warning text-warning-foreground">
                            Goal Achieved
                          </Badge>
                        )}
                        {activity.type === "started" && (
                          <Badge variant="secondary">Started</Badge>
                        )}
                      </div>
                      <p className="font-medium">{activity.title}</p>
                      {activity.playlist && (
                        <p className="text-sm text-muted-foreground">
                          From: {activity.playlist}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start">
                  <Link to="/playlists">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Browse Playlists
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/goals">
                    <Target className="h-4 w-4 mr-2" />
                    Set New Goal
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/summaries">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Summaries
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPlaylists.slice(0, 2).map((playlist) => (
                  <div key={playlist.id} className="group cursor-pointer">
                    <Link to={`/playlists/${playlist.id}`}>
                      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                          <PlayCircle className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{playlist.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress 
                              value={(playlist.completedCount / playlist.videosCount) * 100} 
                              className="flex-1 h-2"
                            />
                            <span className="text-xs text-muted-foreground">
                              {playlist.completedCount}/{playlist.videosCount}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;