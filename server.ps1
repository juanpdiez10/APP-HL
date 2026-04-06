$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running on http://localhost:8080/"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
}

$basePath = $PSScriptRoot

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $localPath = $request.Url.LocalPath
    if ($localPath -eq "/") { $localPath = "/index.html" }

    $filePath = Join-Path $basePath $localPath.TrimStart("/")

    if (Test-Path $filePath) {
        $ext = [System.IO.Path]::GetExtension($filePath)
        $contentType = $mimeTypes[$ext]
        if (-not $contentType) { $contentType = "application/octet-stream" }

        $response.ContentType = $contentType
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        $response.OutputStream.Write($msg, 0, $msg.Length)
    }

    $response.Close()
    Write-Host "$($request.HttpMethod) $($request.Url.LocalPath) -> $($response.StatusCode)"
}
