// main
#import "AppDelegate.h"
#import "FeedViewController.h"
#import "FavoritesViewController.h"
#import "ProfileViewController.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
     FeedViewController *feedController = [[FeedViewController alloc] init];

     UIViewController *favoritesController = [[FavouriteViewController alloc] init];
     UIViewController *profileController = [[ProfileViewController alloc] init];

     UITabBarController *tabBarController = [[UITabBarController alloc] init];
     [tabBarController setViewControllers:@[feedController, favoritesController, profileController]];

     self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
     self.window.rootViewController = tabBarController;
     [self.window makeKeyAndVisible];
     return YES;
}
@end

///////////////////////
// FavouritesViewController.h:
#import <UIKit/UIKit.h>

@interface FavoritesViewController : UIViewController

@end

///////////////////////
#import "FavoritesViewController.h"

@implementation FavoritesViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
     self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
     if (self) {
          // Insert customization code here
          self.title = @"Favorites";
          self.tabBarItem.image = [UIImage imageNamed:@"tab_icon_favorites"];
     }
     return self;
}

- (void)viewDidLoad
{
     [super viewDidLoad];
     self.view.backgroundColor = [UIColor blueColor];
}

@end
