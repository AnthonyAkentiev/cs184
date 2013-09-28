#import "User.h"
#import "AFJSONRequestOperation.h"

@implementation User

-(id)init {
     self = [self initWithJSON];
     return self;
}

-(id)initWithJSON
{
     self = [super init];
     if(self) {
          NSURL *url = [[NSURL alloc] initWithString:@"http://operation-models.codeschool.com/userProfile.json"];
          NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];

          AFJSONRequestOperation *operation = [AFJSONRequestOperation JSONRequestOperationWithRequest:request success:^(NSURLRequest *request, NSHTTPURLResponse *response, id JSON) {
               self.firstName = JSON[@"firstName"];
               self.lastName = JSON[@"lastName"];
               self.city = JSON[@"city"];

               //title: @"Profile"
               //detail: @"This is a profile image"
               //filename: the value returned by the `profilePhoto` key in the `JSON` NSDictionary  
               //thumbnail: the value returned by the `profilePhotoThumbnail` key in the `JSON` NSDictionary 


               self.profilePhoto = [[Photo alloc] initWithTitle: @"title"
                    detail:
filename:JSON[@"filename"]
         thumbnail:JSON[@"thumbnail"]
         ];

               self.biography = JSON[@"biography"];
               self.memberSince = JSON[@"memberSince"];

               [[NSNotificationCenter defaultCenter] postNotificationName:@"initWithJSONFinishedLoading" object:nil];
          } failure:^(NSURLRequest *request, NSHTTPURLResponse *response, NSError *error, id JSON) {
               NSLog(@"NSError: %@",[error localizedDescription]);
          }];

          [operation start];
     }
     return self;
}
@end
