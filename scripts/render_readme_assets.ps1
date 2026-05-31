$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Trust Center Evidence Room", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ProofImage -Title "Trust-room overview for the next diligence review" -Subtitle "One executive surface for artifact coverage, proof freshness, review readiness, and trust posture." -Bullets @(
  "The overview keeps reusable evidence packs, stale proof, and review-readiness drag in one board-readable view.",
  "Leadership can see which trust rooms are ready now and which still require manual packet assembly.",
  "This layer turns trust evidence into reusable operating leverage instead of ad hoc diligence labor."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ProofImage -Title "Evidence-room queue keeps owners, blockers, and next moves connected" -Subtitle "Every route retains the owner, buyer, control area, headline gap, and next move." -Bullets @(
  "The room view makes it obvious which evidence packets are reusable now and which are still slowed by missing ownership.",
  "Blockers stay tied to the actual control area instead of drifting into vague trust-center language.",
  "Leadership can tighten the trust room before the next security, legal, or procurement review starts."
) -OutputPath (Join-Path $screenshots "02-evidence-room-proof.png")

New-ProofImage -Title "Artifact gaps show where evidence and freshness still break" -Subtitle "Coverage, freshness, and company-tag traces stay visible in one reusable trust inventory." -Bullets @(
  "This view keeps IBM, Azure, CyberArk, FinTech, public-sector, and healthcare traces tied to actual live surfaces.",
  "Artifact gaps stay visible before a team promises more than the proof can support.",
  "Leadership can see where the next evidence-room investment will save the most time."
) -OutputPath (Join-Path $screenshots "03-artifact-gaps-proof.png")

New-ProofImage -Title "Review readiness keeps prep drag tied to trust quality" -Subtitle "Review pressure remains grounded in artifact freshness, control evidence, and reuse potential." -Bullets @(
  "The executive story stays tied to actual evidence ownership and proof linkage rather than abstract trust messaging.",
  "Slow review paths remain visible before they turn into procurement bottlenecks.",
  "This creates a repeatable cadence for reusable trust rooms and faster diligence cycles."
) -OutputPath (Join-Path $screenshots "04-review-readiness-proof.png")
