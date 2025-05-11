---
title: Getting started with crawlers
date: 2023-03-11 20:00:14
tags: crawlers

---

# Use requests to send get requests

`requests` is a pyhton http library, please refer to the [official documentation](https://requests.readthedocs.io/en/latest/) for details.

```python
import requests

# Information on crawling websites
url = "https://www.baidu.com/"

# Send request
resp = requests.get(url)

# Setting the character set
resp.encoding = 'utf-8'
# print(resp.text)

# Write the page source code to a file
with open("myblog.html", mode="w", encoding='utf-8') as f:
    f.write(resp.text)
print('over!!!')
```

In this code, we first use the `requests.get` method to try to get the website in the `url`, after getting it, we have to set the character set, otherwise the information will be garbled, generally Chinese websites commonly used in the `uft-8`, we can also check the source code of the website to get the corresponding character set

```html
<html lang="zh-cn">
<head>
    <meta charset="utf-8"/>
```

It is easy to find the appropriate character set to use in the `<head>`.

Next, you can `print(resp.text)` to see the source code of the page we got, or you can write the source code to a file.

# Sending a post request using requests

```python
import requests

url = "https://fanyi.baidu.com/sug"

data = {
    "kw": input("Please enter a word you would like to search for:")
}
resp = requests.post(url, data = data)

# print(resp.text)
print(resp.json())
```

Note: Currently Baidu Translate is encrypted and can't find the `sug` in `Network`, but the code still works!

Go to the Baidu Translate website, open `Network`, type in "hello" to translate, we will find a POST request `sug`, go to `Payload` and observe the parameters of the `sug` request, you can see that we entered the cat.

```
   kw: 'cat'
```

Go to `Preview` and observe the result of the request, you can find that it is a data returned in json format, which contains the result of the translation.

At this point, we can use the format of the data parameter carried by the POST request to achieve the translation function.

If the returned data is in json, you can directly resp.json().

# re module

```python
import re

# Findall gets the list.
#result = re.findall(r"\d+", "Mobile customer service number is 10086, Unicom customer service number is 10010")

# search returns only the first result
#result = re.search(r"\d+", "Mobile customer service number is 10086, Unicom customer service number is 10010")

# Putting all the results in an iterator
result = re.finditer(r"\d+", "Mobile customer service number is 10086, Unicom customer service number is 10010")

print(result)

for item in result:
    print(item.group()) # To get the data from the Match object, you need group()
```

```python
# 预加载
obj = re.compile(r"\d+")

result = obj.finditer("Mobile customer service number is 10086, Unicom customer service number is 10010")

for item in result:
     print(item.group())
```

The re module requires [regular expressions](https://en.wikipedia.org/wiki/Regular_expression).

# Xpath parsing

```python
from lxml import etree

# from lxml import html
# etree = html.etree

# Need to load data ready for parsing
f = open("1.html", mode = "r", encoding = 'utf-8')
pageSource = f.read()

# Load data, return node object
et = etree.HTML(pageSource)

# print(result)

# looping
result = et.xpath("/html/body/div/div/div[@class='recommend02']")
print(result)
if not result:
    print("1")

# for item in result:
#     print(item)
```

XPath can be used to search through HTML documents to extract information.

__Syntax of Xpath__

```python
result = et.xpath("/html") # /html for root node
result = et.xpath("/html/body") # The / in the middle of the expression indicates a layer of html nodes.
result = et.xpath("/html/body/span/text()") # text() indicates that the extraction of text information in the label
result = et.xpath("/html/body/*/a/text()") # *  Arbitrary, wildcard
result = et.xpath("/html/body/*/a/@href") # @denotes an attribute
result = et.xpath("//a/@href") # //Indicates an arbitrary position
result = et.xpath("//div[@class='two']/a/text()") # [@xx=xxx] Attribute qualification
```



# Crawl Douban top250 film information

```python
import requests
import re

head = {
    # UA, server detects current network devices
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                  'AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/103.0.0.0 Safari/537.36'
}

obj = re.compile(r'<div class="item">.*?<span class="title">(?P<name>.*?)</span>'
                 r'.*?<br>(?P<year>.*?)&nbsp.*?<span class="rating_num" '
                 r'property="v:average">(?P<score>.*?)</span>.*?'
                 r'<span>(?P<num>.*?)person rated</span>', re.S) # re.S allows re to match to newlines

for i in range(1, 11):
    page = (i - 1) * 25
    url = f"https://movie.douban.com/top250?start={page}&filter="

    resp = requests.get(url, headers=head) 
    resp.encoding = 'utf-8'  #resp.apparent_encodering

    result = obj.finditer(resp.text)
    for item in result:
        # dic = item.groupdict()
        # dic['year'] = dic['year'].strip()  # Remove spaces (spaces, line breaks, tabs) at the left and right ends of the year.
        # print(dic)
        name = item.group("name")
        year = item.group("year").strip()
        score = item.group("score")
        num = item.group("num")
        with open("movie.txt", mode="a", encoding='utf-8') as f:
            f.write("Film Title：" + name + "\tYear of release：" + year
                    + "\tscore：" + score + "\tNumber of ratings："+ num + "\n")
print('over!!!')
```

included among these

```python
head = {
    # UA, server detects current network devices
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                  'AppleWebKit/537.36 (KHTML, like Gecko) '
                  'Chrome/103.0.0.0 Safari/537.36'
}
·
·
 resp = requests.get(url, headers=head) 
```

To deal with a small counter-crawl, the crawler was disguised with network devices.

