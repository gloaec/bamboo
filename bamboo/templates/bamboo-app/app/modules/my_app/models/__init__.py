from os.path import join, dirname, basename
import glob

def import_mod(name):
    mod = __import__(name)
    components = name.split('.')
    for comp in components[1:]:
        mod = getattr(mod, comp)
    return mod

for f in glob.glob(join(dirname(__file__),"*.py")):
    model = basename(f)[:-3] 
    if model != '__init__':
        mod_name = 'app.models.%s' % model
        try:
            mod = __import__(model, globals(), locals(), fromlist=[model.title()])
            klass = getattr(mod, model.title())
            if not '%s' % model.title() in locals(): 
                locals()[model.title()] = klass
        except ImportError:
            print 'Failed to import Model: ', model
