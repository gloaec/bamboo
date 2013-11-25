#import os
#import glob
#
#for f in glob.glob(os.path.join(os.path.dirname(__file__),"*.py")):
#    model = os.path.basename(f)[:-3] 
#    if model != '__init__':
#        mod_name = 'app.models.%s' % model
#        try:
#            mod = __import__(model, globals(), locals(), fromlist=[model.title()])
#            klass = getattr(mod, model.title())
#            if not '%s' % model.title() in locals(): 
#                locals()[model.title()] = klass
#        except ImportError:
#            print 'Failed to import Model: ', model
