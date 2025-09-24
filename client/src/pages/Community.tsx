import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, MessageSquare, Heart, Share, Plus, Search, TrendingUp, Globe } from "lucide-react";

interface CommunityPost {
  id: string;
  author: {
    name: string;
    location: string;
    avatar?: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
  category: 'question' | 'tip' | 'success' | 'problem';
}

export default function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState<'feed' | 'questions' | 'tips' | 'local'>('feed');
  const [showNewPost, setShowNewPost] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock community posts - TODO: remove mock functionality
  const mockPosts: CommunityPost[] = [
    {
      id: "1",
      author: {
        name: "Sarah Mwangi",
        location: "Nairobi, Kenya",
        avatar: "",
        verified: true
      },
      content: "Great success with my maize crop this season! Used the NPK fertilizer recommendation from AgriMind and got 40% better yield than last year. The AI diagnosis was spot-on about the nitrogen deficiency.",
      timestamp: "2 hours ago",
      likes: 47,
      comments: 12,
      tags: ["maize", "fertilizer", "success"],
      category: "success"
    },
    {
      id: "2", 
      author: {
        name: "John Ochieng",
        location: "Kisumu, Kenya",
      },
      content: "Has anyone dealt with white flies on tomatoes? My plants are heavily infested and I've tried neem oil but it's not working. The AI suggested copper spray but I want to hear from other farmers first.",
      timestamp: "4 hours ago", 
      likes: 23,
      comments: 18,
      tags: ["tomatoes", "pests", "help"],
      category: "question"
    },
    {
      id: "3",
      author: {
        name: "Grace Wanjiku",
        location: "Nakuru, Kenya",
        verified: true
      },
      content: "Tip: Plant marigolds around your tomato beds! They act as natural pest repellent and also attract beneficial insects. Been doing this for 3 seasons and pest problems dropped by 70%.",
      timestamp: "1 day ago",
      likes: 89,
      comments: 25,
      tags: ["companion planting", "organic", "tips"],
      category: "tip"
    },
    {
      id: "4",
      author: {
        name: "Peter Kamau",
        location: "Meru, Kenya"
      },
      content: "My bean plants are showing yellow leaves at the bottom. Used AgriMind camera and it said possible overwatering. Should I stop watering completely for a few days? Rains are expected this week.",
      timestamp: "2 days ago",
      likes: 15,
      comments: 8,
      tags: ["beans", "watering", "diagnosis"],
      category: "problem"
    },
    {
      id: "5",
      author: {
        name: "Mary Njeri",
        location: "Kiambu, Kenya",
        verified: true
      },
      content: "For new farmers: Start small and learn as you go! I began with just 10 tomato plants and now manage 2 acres. AgriMind has been invaluable for learning about crop diseases and soil management.",
      timestamp: "3 days ago",
      likes: 156,
      comments: 34,
      tags: ["beginner tips", "farming advice", "motivation"],
      category: "tip"
    }
  ];

  const categories = [
    { id: 'feed', label: 'All Posts', icon: Users, count: mockPosts.length },
    { id: 'questions', label: 'Questions', icon: MessageSquare, count: mockPosts.filter(p => p.category === 'question').length },
    { id: 'tips', label: 'Tips & Advice', icon: TrendingUp, count: mockPosts.filter(p => p.category === 'tip').length },
    { id: 'local', label: 'Local Community', icon: Globe, count: mockPosts.length }
  ];

  const filteredPosts = mockPosts.filter(post => {
    if (selectedTab === 'feed') return true;
    if (selectedTab === 'questions') return post.category === 'question' || post.category === 'problem';
    if (selectedTab === 'tips') return post.category === 'tip' || post.category === 'success';
    if (selectedTab === 'local') return post.author.location.includes('Kenya'); // Mock local filter
    return true;
  }).filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'question':
      case 'problem':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'tip':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'success':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Farming Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow farmers, share knowledge, and learn together
          </p>
        </div>

        {/* Community Stats */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">12.5K</div>
                <div className="text-xs text-muted-foreground">Active Farmers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">2.3K</div>
                <div className="text-xs text-muted-foreground">Tips Shared</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">8.7K</div>
                <div className="text-xs text-muted-foreground">Questions Answered</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedTab === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTab(category.id as any)}
                className="flex items-center gap-2 whitespace-nowrap"
                data-testid={`tab-${category.id}`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>

        {/* Search and New Post */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search posts, tips, or questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="search-community"
            />
          </div>
          <Button
            onClick={() => setShowNewPost(!showNewPost)}
            data-testid="new-post-toggle"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post
          </Button>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Share with the Community</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Share your farming experience, ask a question, or give advice..."
                className="min-h-20"
                data-testid="new-post-content"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">tip</Badge>
                  <Badge variant="outline" className="text-xs">question</Badge>
                  <Badge variant="outline" className="text-xs">success</Badge>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowNewPost(false)}
                    data-testid="cancel-post"
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => {
                      console.log('Post submitted');
                      setShowNewPost(false);
                    }}
                    data-testid="submit-post"
                  >
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="font-medium mb-2">No posts found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery ? "Try different search terms" : "Be the first to share something!"}
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setShowNewPost(true);
                  }}
                  data-testid="create-first-post"
                >
                  {searchQuery ? "Clear search" : "Create post"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="hover-elevate">
                <CardContent className="p-4 space-y-4">
                  {/* Post Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{post.author.name}</span>
                          {post.author.verified && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{post.author.location}</p>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </Badge>
                  </div>

                  {/* Post Content */}
                  <p className="text-sm leading-relaxed">{post.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-4 pt-2 border-t">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground"
                      onClick={() => console.log('Like post:', post.id)}
                      data-testid={`like-post-${post.id}`}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground"
                      onClick={() => console.log('View comments:', post.id)}
                      data-testid={`comments-post-${post.id}`}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground"
                      onClick={() => console.log('Share post:', post.id)}
                      data-testid={`share-post-${post.id}`}
                    >
                      <Share className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="text-center">
            <Button 
              variant="outline"
              onClick={() => console.log('Load more posts')}
              data-testid="load-more-posts"
            >
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}