from PIL import Image
import os

source_folder = "NeuroSleep-V8-raw"
output_folder = "images/v8"

os.makedirs(output_folder, exist_ok=True)


rename_list = [
    "neurosleep-v8-hero.webp",
    "smart-pillow-ai.webp",
    "adaptive-height.webp",
    "adaptive-softness.webp",
    "temperature-control.webp",
    "brain-health-monitoring.webp",
    "health-risk-alert.webp",
    "ai-health-dashboard.webp"
]


files = sorted(
    [
        f for f in os.listdir(source_folder)
        if f.lower().endswith((".jpg", ".jpeg", ".png"))
    ]
)


for index, file in enumerate(files):

    img_path = os.path.join(source_folder, file)

    img = Image.open(img_path)


    if index < len(rename_list):
        output_name = rename_list[index]
    else:
        output_name = f"extra-{index}.webp"


    output_path = os.path.join(
        output_folder,
        output_name
    )


    img.save(
        output_path,
        "WEBP",
        quality=90
    )


    print(
        f"完成: {file} -> {output_name}"
    )


print("全部转换完成")