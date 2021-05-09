import os
import shutil

#os.rename("path/to/current/file.foo", "path/to/new/destination/for/file.foo")
#shutil.move("path/to/current/file.foo", "path/to/new/destination/for/file.foo")
#os.replace("path/to/current/file.foo", "path/to/new/destination/for/file.foo")

counter = 0
os.chdir("./upload")
original_working_directory = os.getcwd()
image_folders = os.listdir()
for directory in image_folders:
    os.chdir(f'{original_working_directory}/{directory}')
    for file_name in os.listdir():
        current = f'{os.getcwd()}/{file_name}'
        new_file_name = f'{counter}.' + file_name.split(".")[-1]
        target = f'{original_working_directory}/{new_file_name}'
        shutil.move(current, target)
        print(counter)
        counter += 1
    os.chdir(original_working_directory)
print('done')
