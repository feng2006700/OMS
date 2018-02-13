using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace YSS.OMS.Common
{
    public class DBLog<T>
    {
        private static DBLog<T> _current;

        private static ConcurrentDictionary<string, T> _logDict;
        private string _logStoreFile = "systemLog.txt";

        static DBLog()
        {
            _current = new DBLog<T>();
        }

        private DBLog()
        {
            _logDict = new ConcurrentDictionary<string, T>();
        }

        public static DBLog<T> Current
        {
            get
            {
                return _current;
            }
        }

        public int Count()
        {
            return _logDict.Count;
        }

        public void Add(string key, T value)
        {
            _logDict.TryAdd(key, value);
        }

        public KeyValuePair<string, T> GetLastOrDefault()
        {
            if (Count() > 0)
            {
                return _logDict.LastOrDefault();
            }
            else
            {
                return default(KeyValuePair<string, T>);
            }
        }

        public T Get(string key)
        {
            if (Count() > 0)
            {
                T entity;
                if (_logDict.TryGetValue(key, out entity))
                {
                    return entity;
                }
                else
                {
                    return default(T);
                }
            }
            else
            {
                return default(T);
            }
        }

        public T Remove(string key)
        {
            if (Count() > 0)
            {
                T entity;
                if (_logDict.TryRemove(key, out entity))
                {
                    return entity;
                }
                else
                {
                    return default(T);
                }
            }
            else
            {
                return default(T);
            }
        }

        private string GetFilePath()
        {
            return Path.Combine(AppConfig.ServerPath, _logStoreFile);
        }

        public void Persistence()
        {
            KeyValuePair<string, T>[] logArray = _logDict.ToArray();
            if (logArray != null && logArray.Length > 0)
            {
                try
                {
                    using (FileStream fileStream = File.Open(GetFilePath(), FileMode.Create, FileAccess.Write, FileShare.Read))
                    {
                        BinaryFormatter binaryFormatter = new BinaryFormatter();
                        binaryFormatter.Serialize(fileStream, logArray);
                    }
                }
                catch (Exception ex)
                {
                    LogFactory.DefaultLogger.Error(ex);
                }
            }
        }

        public void Load()
        {
            try
            {
                KeyValuePair<string, T>[] entityArray = null;
                string fileFullPath = GetFilePath();
                if (File.Exists(fileFullPath))
                {
                    using (FileStream fileStream = File.Open(fileFullPath, FileMode.Open, FileAccess.Read, FileShare.Read))
                    {
                        BinaryFormatter binaryFormatter = new BinaryFormatter();
                        object result = binaryFormatter.Deserialize(fileStream);
                        entityArray = result as KeyValuePair<string, T>[];
                    }
                    File.Delete(fileFullPath);
                }
                if (entityArray != null && entityArray.Length > 0)
                {
                    foreach (KeyValuePair<string, T> item in entityArray)
                    {
                        Add(item.Key, item.Value);
                    }
                }
            }
            catch (Exception ex)
            {
                LogFactory.DefaultLogger.Error(ex);
            }
        }
    }
}
