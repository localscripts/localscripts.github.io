local previousMessages = {}
local tester = "voxlis.NET Team"
local currentTime = os.date("%Y-%m-%d %H:%M:%S")
local running = true
local sunc = true

print([[




                                    $$\ $$\               $$\   $$\ $$$$$$$$\ $$$$$$$$\ 
                                    $$ |\__|              $$$\  $$ |$$  _____|\__$$  __|
     $$\    $$\  $$$$$$\  $$\   $$\ $$ |$$\  $$$$$$$\     $$$$\ $$ |$$ |         $$ |   
     \$$\  $$  |$$  __$$\ \$$\ $$  |$$ |$$ |$$  _____|    $$ $$\$$ |$$$$$\       $$ |   
      \$$\$$  / $$ /  $$ | \$$$$  / $$ |$$ |\$$$$$$\      $$ \$$$$ |$$  __|      $$ |   
       \$$$  /  $$ |  $$ | $$  $$<  $$ |$$ | \____$$\     $$ |\$$$ |$$ |         $$ |   
        \$  /   \$$$$$$  |$$  /\$$\ $$ |$$ |$$$$$$$  |$$\ $$ | \$$ |$$$$$$$$\    $$ |   
         \_/     \______/ \__/  \__|\__|\__|\_______/ \__|\__|  \__|\________|   \__|   v1.0
   
            Z - Runs sUNC | X - Runs UNC | C - Saves Console Output to workspace                                                        
                                                                                   
                                                                                   
]])

-- Function to save the console log
local function saveConsole()
    local logHistory = game:GetService("LogService"):GetLogHistory()
    local allMessages = ""

    for _, logEntry in ipairs(logHistory) do
        local message = ""

        if logEntry.messageType == Enum.MessageType.MessageError then
            message = "- " .. logEntry.message
        elseif logEntry.messageType == Enum.MessageType.MessageWarning then
            message = "+ " .. logEntry.message
        else
            message = logEntry.message
        end

        if not table.find(previousMessages, message) then
            table.insert(previousMessages, message)
        end

        allMessages = allMessages .. message .. "\n"
    end

    -- Save log to a file
    writefile(identifyexecutor() .. ".txt", allMessages)
    print("Console saved to file.")
end

-- Function to execute sUNC (this simulates sUNC execution)
local function executeSUNC()
    sunc = true
    print([[

░██████╗██╗░░░██╗███╗░░██╗░█████╗░
██╔════╝██║░░░██║████╗░██║██╔══██╗
╚█████╗░██║░░░██║██╔██╗██║██║░░╚═╝
░╚═══██╗██║░░░██║██║╚████║██║░░██╗
██████╔╝╚██████╔╝██║░╚███║╚█████╔╝
╚═════╝░░╚═════╝░╚═╝░░╚══╝░╚════╝░

    Script: https://voxlis.net/assets/unc/lua/dumper.lua
]])
    print([[


    ]])
    print("Testing Date and Time: " .. currentTime)
    print(identifyexecutor() .. " tested by " .. tester .. " for voxlis.NET")
        print([[


    ]])
    -- Load sUNC script (you can replace this URL with the correct one)
    loadstring(game:HttpGet("https://gitlab.com/sens3/nebunu/-/raw/main/HummingBird8's_sUNC_yes_i_moved_to_gitlab_because_my_github_acc_got_brickedd/sUNCm0m3n7.lua"))()
end

-- Function to execute UNC (this simulates UNC execution)
local function executeUNC()
    sunc = false
    print([[

██╗░░░██╗███╗░░██╗░█████╗░ 
██║░░░██║████╗░██║██╔══██╗ 
██║░░░██║██╔██╗██║██║░░╚═╝ 
██║░░░██║██║╚████║██║░░██╗ 
╚██████╔╝██║░╚███║╚█████╔╝ 
░╚═════╝░╚═╝░░╚══╝░╚════╝░

    Script: https://voxlis.net/assets/unc/lua/dumper.lua
]])
    print([[


    ]])
    print("Testing Date and Time: " .. currentTime)
    print(identifyexecutor() .. " tested by " .. tester .. " for voxlis.NET")
        print([[


    ]])
    -- Load UNC script (you can replace this URL with the correct one)
    loadstring(game:HttpGet("https://raw.githubusercontent.com/unified-naming-convention/NamingStandard/refs/heads/main/UNCCheckEnv.lua"))()
end

-- Function to handle key inputs
local function onKeyPressed(input, gameProcessedEvent)
    if gameProcessedEvent then return end  -- Ignore keypress if the game has already processed it
    
    if input.KeyCode == Enum.KeyCode.Z then
        executeSUNC()  -- Trigger sUNC on "Z" key press
    elseif input.KeyCode == Enum.KeyCode.X then
        executeUNC()  -- Trigger UNC on "X" key press
    elseif input.KeyCode == Enum.KeyCode.C then
        saveConsole()  -- Save console logs on "C" key press
        running = false  -- Stop the script after saving
    end
end

-- Connect key press event
game:GetService("UserInputService").InputBegan:Connect(onKeyPressed)

-- Wait until the user stops the script manually or presses "C" to save
while running do
    wait(1)  -- Waits until the "C" key is pressed to save and stop the script
end

print("Script execution finished.")
