from PIL import Image
import os


# 原始图片目录
source_folder = "NeuroSleep-V8-raw"

# 输出目录
output_folder = "images/v8"

os.makedirs(output_folder, exist_ok=True)


# 图片对应名称
rename_map = [
    ("image (2).jpg", "neurosleep-v8-hero.webp"),
    ("image (3).jpg", "smart-pillow-ai.webp"),
    ("image (1).jpg", "adaptive-softness.webp"),
    ("image (4).jpg", "temperature-control.webp"),
    ("image (5).jpg", "brain-health-monitoring.webp"),
    ("image (7).jpg", "ai-health-dashboard.webp"),
    ("image.jpg", "ai-mobile-app.webp"),
    ("image (6).jpg", "future-ai-platform.webp"),
]


def crop_to_16_9(img):

    width, height = img.size

    target_ratio = 16 / 9

    current_ratio = width / height


    if current_ratio > target_ratio:
        # 太宽，裁左右
        new_width = int(height * target_ratio)

        left = (width - new_width) // 2

        img = img.crop(
            (
                left,
                0,
                left + new_width,
                height
            )
        )

    else:
        # 太高，裁上下
        new_height = int(width / target_ratio)

        top = (height - new_height) // 2

        img = img.crop(
            (
                0,
                top,
                width,
                top + new_height
            )
        )

    return img



for old_name, new_name in rename_map:

    old_path = os.path.join(
        source_folder,
        old_name
    )


    if not os.path.exists(old_path):
        print("找不到:", old_name)
        continue


    img = Image.open(old_path)


    # 裁剪16:9
    img = crop_to_16_9(img)


    # 调整尺寸
    img = img.resize(
        (1536,864),
        Image.LANCZOS
    )


    output_path = os.path.join(
        output_folder,
        new_name
    )


    img.save(
        output_path,
        "WEBP",
        quality=90
    )


    print(
        "完成:",
        new_name
    )


print("\nNeuroSleep V8 图片处理完成！")