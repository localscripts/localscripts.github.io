-- // Write console to file and GUI countdown with "Save Now" button
local previousMessages = {}
local countdownTime = 120

-- Create a GUI for the countdown
local screenGui = Instance.new("ScreenGui", game.Players.LocalPlayer:WaitForChild("PlayerGui"))
screenGui.ResetOnSpawn = false

local countdownLabel = Instance.new("TextLabel", screenGui)
countdownLabel.Size = UDim2.new(0.3, 0, 0.1, 0)
countdownLabel.Position = UDim2.new(0.35, 0, 0.4, 0)
countdownLabel.BackgroundColor3 = Color3.new(0, 0, 0)
countdownLabel.TextColor3 = Color3.new(1, 1, 1)
countdownLabel.Font = Enum.Font.SourceSansBold
countdownLabel.TextScaled = true
countdownLabel.Text = "Starting..."

local saveButton = Instance.new("TextButton", screenGui)
saveButton.Size = UDim2.new(0.3, 0, 0.1, 0)
saveButton.Position = UDim2.new(0.35, 0, 0.55, 0)
saveButton.BackgroundColor3 = Color3.new(0.2, 0.2, 0.2)
saveButton.TextColor3 = Color3.new(1, 1, 1)
saveButton.Font = Enum.Font.SourceSansBold
saveButton.TextScaled = true
saveButton.Text = "Save Now"

local running = true -- Control script execution

local function saveConsole()
    local logHistory = game:GetService("LogService"):GetLogHistory()
    local allMessages = ""

    -- Collect all log messages
    for i = 1, #logHistory do
        local logEntry = logHistory[i]
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

    -- Write the log to a file
    writefile(identifyexecutor()..".txt", allMessages)
end

saveButton.MouseButton1Click:Connect(function()
    saveConsole()
    screenGui:Destroy() -- Close the UI
    running = false -- Stop the script
end)

while running do
    for i = countdownTime, 0, -1 do
        if not running then break end
        countdownLabel.Text = "Saving console in " .. i .. " seconds..."
        wait(1)
    end

    if running then
        saveConsole()
        countdownLabel.Text = "Console saved! Restarting countdown..."
        wait(1)
    end
end
