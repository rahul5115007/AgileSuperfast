using System.Text.RegularExpressions;
using Microsoft.Playwright;
using Microsoft.Playwright.Xunit;

namespace PlaywrightTests;

public class UnitTest1: PageTest
{
    [Fact]
    public async Task HasTitle(){
        await Page.GotoAsync("http://localhost:5000");

        //Expect a title "to contain" a substring.
        await Expect(Page).ToHaveTitleAsync(new Regex("Your store."));

    }
    
}