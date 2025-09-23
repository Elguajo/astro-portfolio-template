import os
import shutil
import subprocess

branch_name = 'designer'

def run_cmd(cmd, cwd=None):
    print(f"👉 Executing command: {cmd}")
    result = subprocess.run(cmd, shell=True, cwd=cwd)
    if result.returncode != 0:
        print("❌ Command execution failed!")
        exit(1)

def main():
    # 1. Delete website directory
    website_dir = os.path.join(os.getcwd(), "website")
    if os.path.exists(website_dir):
        print("🧹 Deleting website directory...")
        shutil.rmtree(website_dir)

    # 2. Git clone docs branch to website directory
    repo_url = "git@github.com:rnetao/howduudu.tech.git"
    print("📥 Cloning docs branch to website...")
    run_cmd(f"git clone --depth 1 -b {branch_name} {repo_url} website")

    site_dir = os.path.join(os.getcwd(), "dist")
    if not os.path.exists(site_dir):
        print("❌ Error: dist directory does not exist!")
        exit(1)

    print("📋 Copying dist content to website...")
    for item in os.listdir(site_dir):
        s = os.path.join(site_dir, item)
        d = os.path.join(website_dir, item)
        if os.path.isdir(s):
            if os.path.exists(d):
                shutil.rmtree(d)
            shutil.copytree(s, d)
        else:
            shutil.copy2(s, d)

    # 4. Execute git push in website directory
    print("🚀 Preparing to push to remote repository...")
    run_cmd("git add .", cwd=website_dir)
    run_cmd('git commit -m "Auto-update website content"', cwd=website_dir)
    run_cmd("git push", cwd=website_dir)

    print("✅ All done!")

if __name__ == "__main__":
    main()



