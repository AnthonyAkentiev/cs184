/// 
#import "User.h"
#import "AFJSONRequestOperation.h"
#import "Photo.h"

@implementation User

- (id)init
{
     self = [self initWithJSON];
     return self;
}

- (id)initWithJSON
{
     self = [super init];
     if(self) {        
          NSURL *url = [[NSURL alloc] initWithString:@"http://operation-models.codeschool.com/userProfile.json"];
          NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];

          AFJSONRequestOperation *operation = [AFJSONRequestOperation JSONRequestOperationWithRequest:request success:^(NSURLRequest *request, NSHTTPURLResponse *response, id JSON) {
               self.firstName = JSON[@"firstName"];
               self.lastName = JSON[@"lastName"];
               self.city = JSON[@"city"];
               self.profilePhoto = [[Photo alloc] initWithTitle:@"Profile Photo"
                    detail:@"detail"
                    filename:JSON[@"profilePhoto"]
                    thumbnail:JSON[@"profilePhotoThumbnail"]];
               self.biography = JSON[@"biography"];
               self.memberSince = JSON[@"memberSince"];

               self.location = @"no location yet";

               [[NSNotificationCenter defaultCenter] postNotificationName:@"initWithJSONFinishedLoading" object:nil];
          } failure:^(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error, id JSON) {
               NSLog(@"NSError: %@",[error localizedDescription]);
          }];

          [operation start];

     }
     return self;
}

+(NSString *)getPathToArchive {
     NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
     NSString *docsDir = [paths objectAtIndex:0];
     return [docsDir stringByAppendingPathComponent:@"model"];
}

-(void)encodeWithCoder:(NSCoder *)anEncoder {
     [anEncoder encodeObject:self.firstName forKey:@"firstName"];
     [anEncoder encodeObject:self.lastName forKey:@"lastName"];
     [anEncoder encodeObject:self.city forKey:@"city"];
     [anEncoder encodeObject:self.profilePhoto forKey:@"profilePhoto"];
     [anEncoder encodeObject:self.memberSince forKey:@"memberSince"];
     [anEncoder encodeObject:self.biography forKey:@"biography"];
     [anEncoder encodeObject:self.location forKey:@"location"];
}

-(id)initWithCoder:(NSCoder *)aDecoder {
     self = [super init];
     if(self) {
          self.firstName = [aDecoder decodeObjectForKey:@"firstName"];
          self.lastName = [aDecoder decodeObjectForKey:@"lastName"];
          self.city = [aDecoder decodeObjectForKey:@"city"];
          self.profilePhoto = [aDecoder decodeObjectForKey:@"profilePhoto"];
          self.memberSince = [aDecoder decodeObjectForKey:@"memberSince"];
          self.biography = [aDecoder decodeObjectForKey:@"biography"];
          self.location = [aDecoder decodeObjectForKey:@"location"];
     }
     return self;
}
@end


/// AppDelegate
#import "AppDelegate.h"
#import "FeedTableViewController.h"
#import "FavoritesTableViewController.h"
#import "ProfileViewController.h"
#import "User.h"
#import "Photo.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
     FeedTableViewController *feedTableViewController = [[FeedTableViewController alloc] initWithStyle:UITableViewStylePlain];
     UINavigationController *feedNavController = [[UINavigationController alloc] initWithRootViewController:feedTableViewController];

     FavoritesTableViewController *favoritesTableViewController = [[FavoritesTableViewController alloc] initWithStyle:UITableViewStyleGrouped];
     UINavigationController *favoritesNavController = [[UINavigationController alloc] initWithRootViewController:favoritesTableViewController];

     ProfileViewController *profileViewController = [[ProfileViewController alloc] init];
     UINavigationController *profileNavController = [[UINavigationController alloc] initWithRootViewController:profileViewController];

     UITabBarController *tabBarController = [[UITabBarController alloc] init];
     tabBarController.viewControllers = @[feedNavController, favoritesNavController, profileNavController];

     self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];

     self.window.rootViewController = tabBarController;
     [self.window makeKeyAndVisible];

     User *user = [[User alloc] init];
     user.firstName = @"Mr.";
     user.lastName = @"Higgie";
     user.city = @"Cupertino";
     user.profilePhoto = [[Photo alloc] init];
     user.memberSince = @"June 2007";
     user.location = @"Orlando, FL";

     [NSKeyedArchiver archiveRootObject:user toFile:[user getPathToArchive]];

     return YES;
}
@end
