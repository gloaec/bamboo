import os
from webassets import Bundle    

def bundle_dir(directory, static_root, static_folder, recursive=True):
    bundle           = []
    coffee_folder    = os.path.join(static_folder, 'coffee')
    coffee_root      = os.path.join(static_root, 'coffee')
    js_folder        = os.path.join(static_folder, 'js')
    js_root          = os.path.join(static_root, 'js')
    coffee_directory = os.path.join(coffee_folder, directory)
    js_directory     = os.path.join(js_folder, directory)

    if not os.path.isdir(coffee_directory):
        return bundle
    #elif not os.path.isdir(js_directory):
    #    os.makedirs(js_directory)

    root, dirs, files = next(os.walk(coffee_directory))

    if recursive:
        for d in sorted(dirs):
            next_directory = os.path.join(directory, d)
            bundle.extend(bundle_dir(next_directory, static_root,
                    static_folder, recursive=True))

    for f in sorted(files):
        if f.endswith('.coffee'):
            coffee_file = os.path.join(coffee_root, directory, f)
            js_file     = os.path.join(js_root,   directory, f)
            js_file     = js_file.replace('.js.coffee', '.js')
            js_file     = js_file.replace('.coffee',    '.js')
            bundle.append(Bundle(coffee_file, filters="coffeescript", output=js_file))
            
    return bundle


def bundle_module(static_folder, static_root):
    bundle        = []
    js_folder     = os.path.join(static_folder, 'js')

    if not os.path.exists(js_folder):
        os.makedirs(js_folder)

    bundle.extend(bundle_dir('config',      static_root, static_folder))
    bundle.extend(bundle_dir('',            static_root, static_folder, recursive=False))
    bundle.extend(bundle_dir('controllers', static_root, static_folder))
    bundle.extend(bundle_dir('entities',    static_root, static_folder))
    bundle.extend(bundle_dir('views',       static_root, static_folder))
    bundle.extend(bundle_dir('components',  static_root, static_folder))
    bundle.extend(bundle_dir('apps',        static_root, static_folder))

    return bundle


def all_files_with_extension(prefix, extension, depth=6):
    urls = []
    if not prefix: prefix = ''
    elif not prefix.endswith('/'): prefix+='/'
    for i in range(depth):
        urls.append(prefix+'**/'*i+'*.'+extension)
    return urls
