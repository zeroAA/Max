#ifndef _BINARY_READ_UTIL_
#define _BINARY_READ_UTIL_


#include "cocos2d.h"
USING_NS_CC;
using namespace std;

class BinaryReadUtil :public cocos2d::Ref
{
public:
	static BinaryReadUtil * create(const string& filePath);
    
	void close(void);

	int readInt(void);
	short readShort(void);
	long readLong(void);
	bool readBoolean(void);
	signed char readByte(void);
    bool readBool(void);
	float readFloat(void);
	bool readUtf(string &out);
    string readUtf();
    void readBytes(unsigned char * data, int length);
    
    unsigned long getFileLength() { return fileLength; }

protected:
    bool checkSize(int size);
    
private:
	bool init(const string& filePath);

#if CC_TARGET_PLATFORM == CC_PLATFORM_WIN32
	gzFile readFile;
#else
	unsigned char* fileData;
	unsigned long fileLength;
	unsigned long fileCursor;
#endif
};

#endif