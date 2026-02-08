<div className="h-[calc(100vh-4rem)] w-full flex flex-col overflow-hidden">
  {/* Header */}
  <header className="flex h-16 items-center justify-between px-6 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
    <div className="flex items-center gap-3">
      <h1 className="text-lg font-semibold tracking-tight">
        {meetingName || "Untitled Meeting"}
      </h1>
      <Badge variant="outline" className="h-6 gap-1.5 font-normal">
        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
        Live
      </Badge>
    </div>

    <div className="flex items-center gap-3">
      <div className="flex -space-x-2 overflow-hidden">
        {/* Mock Participants for UI feel */}
        <Avatar className="h-8 w-8 border-2 border-background ring-offset-background">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar className="h-8 w-8 border-2 border-background ring-offset-background">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
          +2
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
        <Users className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  </header>

  {/* Main Stage */}
  <main className="flex-1 p-4 flex gap-4 overflow-hidden bg-muted/10 relative">
    <div className="flex-1 flex flex-col items-center justify-center rounded- border-2 border-dashed border-muted-foreground/20 bg-card/50 relative overflow-hidden group">
      {/* Empty State / Video Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <Avatar className="h-full w-full">
              <AvatarFallback className="text-2xl">AI</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="text-lg font-medium">Waiting for participant...</h3>
            <p className="text-sm text-muted-foreground">{meetingName}</p>
          </div>
        </div>
      </div>

      {/* Local Video Float */}
      <div className="absolute bottom-4 right-4 h-32 w-48 bg-muted rounded-lg shadow-lg border border-border overflow-hidden z-20 transition-transform hover:scale-105">
        <div className="w-full h-full flex items-center justify-center bg-black/80">
          <span className="text-xs text-white/50">You</span>
        </div>
      </div>
    </div>
  </main>

  {/* Control Bar */}
  <footer className="h-20 flex items-center justify-center gap-4 border-t bg-card/50 backdrop-blur-sm pb-2">
    <Button
      variant={isMicOn ? "secondary" : "destructive"}
      size="icon"
      className="h-12 w-12 rounded-full shadow-md transition-all duration-200 hover:scale-105"
      onClick={() => setIsMicOn(!isMicOn)}
    >
      {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
    </Button>

    <Button
      variant={isCamOn ? "secondary" : "destructive"}
      size="icon"
      className="h-12 w-12 rounded-full shadow-md transition-all duration-200 hover:scale-105"
      onClick={() => setIsCamOn(!isCamOn)}
    >
      {isCamOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
    </Button>

    <Button
      variant="secondary"
      size="icon"
      className="h-12 w-12 rounded-full shadow-md transition-all duration-200 hover:scale-105"
    >
      <MonitorUp className="h-5 w-5" />
    </Button>

    <Button
      variant="secondary"
      size="icon"
      className="h-12 w-12 rounded-full shadow-md transition-all duration-200 hover:scale-105"
    >
      <Maximize2 className="h-5 w-5" />
    </Button>

    <div className="w-px h-8 bg-border mx-2" />

    <Button
      variant="destructive"
      size="icon"
      className="h-14 w-14 rounded-full shadow-lg hover:bg-destructive/90 transition-all duration-200 hover:scale-105"
      onClick={() => router.push(`/meetings/${meetingId}`)}
    >
      <PhoneOff className="h-6 w-6" />
    </Button>
  </footer>
</div>