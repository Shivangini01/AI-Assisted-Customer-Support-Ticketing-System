$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer " + (Get-Content "token.txt" -ErrorAction SilentlyContinue)
}

# 1. Login to get token
$loginBody = @{
    usernameOrEmail = "admin"
    password = "admin"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
    $token = $response.accessToken
    $headers.Authorization = "Bearer $token"
    Write-Host "Login Success. Token acquired."
} catch {
    Write-Host "Login Failed: $_"
    exit
}

# 2. Get a ticket ID (assuming ticket #1 exists from previous steps)
$ticketId = 1

# 3. Test PATCH Update
try {
    $uri = "http://localhost:8080/api/tickets/$ticketId/status?status=IN_PROGRESS"
    Write-Host "Sending PATCH to $uri"
    
    $patchResponse = Invoke-RestMethod -Uri $uri -Method Patch -Headers $headers
    
    Write-Host "Update Success! New Status: $($patchResponse.status)"
} catch {
    Write-Host "Update Failed `nStatus: $($_.Exception.Response.StatusCode.value__) `nError: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
        $body = $reader.ReadToEnd()
        Write-Host "Body: $body"
    }
}
