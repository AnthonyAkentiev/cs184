#import "AppDelegate.h"

@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
     CGRect viewRect = [[UIScreen mainScreen]bounds]; 
     self.window = [[UIWindow alloc]initWithFrame: viewRect];

     UIViewController* vc = [[UIViewController alloc]init];
     UIView* view = [[UIView alloc]initWithFrame:viewRect];
     vc.view = view;

     view.backgroundColor = [UIColor yellowColor];
     self.window.rootViewController = vc;
     [self.window makeKeyAndVisible];
     return YES;
}
@end
